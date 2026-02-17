import { supabase } from './client'

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateInviteCode(): string {
  return Math.random().toString(36).substr(2, 6).toUpperCase()
}

function generateQRSecret(): string {
  return Math.random().toString(36).substr(2, 16)
}

// ============================================================================
// EVENT CRUD OPERATIONS
// ============================================================================

export async function createEvent(eventData: {
  name: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  visibility: 'public' | 'private' | 'invite-only'
  cover_image_url?: string
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('events')
    .insert({
      ...eventData,
      organizer_id: user.id,
      invite_code: generateInviteCode(),
      qr_secret: generateQRSecret(),
      status: 'draft',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateEvent(eventId: string, updates: any) {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', eventId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteEvent(eventId: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', eventId)

  if (error) throw error
}

export async function getEventById(eventId: string) {
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      organizer:profiles!organizer_id(id, name, email),
      sessions(*)
    `)
    .eq('id', eventId)
    .single()

  if (error) throw error
  return data
}

export async function getOrganizerEvents(organizerId: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organizer_id', organizerId)
    .order('date', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getPublicEvents() {
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      organizer:profiles!organizer_id(name)
    `)
    .eq('visibility', 'public')
    .eq('status', 'published')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })

  if (error) throw error
  return data || []
}

export async function publishEvent(eventId: string) {
  return updateEvent(eventId, { status: 'published' })
}

// ============================================================================
// SESSION OPERATIONS
// ============================================================================

export async function createSession(sessionData: {
  event_id: string
  title: string
  description?: string
  start_time: string
  end_time: string
  room?: string
  speaker_name?: string
  speaker_bio?: string
  order_index?: number
}) {
  const { data, error } = await supabase
    .from('sessions')
    .insert(sessionData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteSession(sessionId: string) {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('id', sessionId)

  if (error) throw error
}

export async function getEventSessions(eventId: string) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('event_id', eventId)
    .order('start_time', { ascending: true })

  if (error) throw error
  return data || []
}

// ============================================================================
// REGISTRATION OPERATIONS
// ============================================================================

export async function registerForEvent(eventId: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Check capacity
  const event = await getEventById(eventId)
  const { count } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('status', 'registered')

  if (count && count >= event.capacity) {
    throw new Error('Event is full')
  }

  // Generate unique QR code
  const qr_code_data = `QR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const { data, error } = await supabase
    .from('registrations')
    .insert({
      event_id: eventId,
      user_id: user.id,
      qr_code_data,
      status: 'registered',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function checkInParticipant(qrCodeData: string) {
  const { data, error } = await supabase
    .from('registrations')
    .update({
      status: 'checked_in',
      checked_in_at: new Date().toISOString(),
    })
    .eq('qr_code_data', qrCodeData)
    .eq('status', 'registered')
    .select(`
      *,
      user:profiles!user_id(*)
    `)
    .single()

  if (error) throw error
  return data
}

export async function getMyRegistrations(userId: string) {
  const { data, error } = await supabase
    .from('registrations')
    .select(`
      *,
      event:events(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getEventRegistrations(eventId: string) {
  const { data, error } = await supabase
    .from('registrations')
    .select(`
      *,
      user:profiles!user_id(*)
    `)
    .eq('event_id', eventId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getEventStats(eventId: string) {
  const { data: registrations } = await supabase
    .from('registrations')
    .select('status')
    .eq('event_id', eventId)

  const stats = {
    registered: registrations?.filter(r => r.status === 'registered').length || 0,
    checked_in: registrations?.filter(r => r.status === 'checked_in').length || 0,
    cancelled: registrations?.filter(r => r.status === 'cancelled').length || 0,
  }

  return stats
}
