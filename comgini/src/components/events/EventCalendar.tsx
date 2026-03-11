import { useRef, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventsService from '../../services/eventsService'
import type { Event as APIEvent } from '../../services/eventsService'

type Props = {
    clientId: number
    refreshTrigger?: number
}

export default function EventCalendar({ clientId, refreshTrigger }: Props) {
    const calendarRef = useRef<FullCalendar>(null)
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const fetchEvents = async (start: string, end: string) => {
        setLoading(true)
        try {
            const response = await eventsService.getEvents(start, end)
            if (response.success && response.data) {
                const mappedEvents = response.data
                    .filter((e: APIEvent) => e.client_id === clientId)
                    .map((e: APIEvent) => ({
                        id: String(e.id),
                        title: e.title,
                        start: e.start_datetime,
                        end: e.end_datetime,
                        extendedProps: { ...e }
                    }))
                setEvents(mappedEvents)
            }
        } catch (error) {
            console.error("Failed to fetch events", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDatesSet = (dateInfo: any) => {
        const start = dateInfo.startStr.split('T')[0]
        const end = dateInfo.endStr.split('T')[0]
        fetchEvents(start, end)
    }

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi()
            const start = calendarApi.view.activeStart.toISOString().split('T')[0]
            const end = calendarApi.view.activeEnd.toISOString().split('T')[0]
            fetchEvents(start, end)
        }
    }, [refreshTrigger, clientId])

    return (
        <div className="position-relative">
            {loading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 10, background: 'rgba(255,255,255,0.5)' }}>
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            )}
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                datesSet={handleDatesSet}
                height="auto"
                themeSystem="bootstrap5"
                eventDisplay="block"
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short'
                }}
            />
            <style>{`
        .fc { font-size: 14px; }
        .fc .fc-button-primary {
          background-color: #fff;
          border-color: #dee2e6;
          color: #212529;
          font-weight: 500;
          text-transform: capitalize;
        }
        .fc .fc-button-primary:hover {
          background-color: #f8f9fa;
          border-color: #dee2e6;
          color: #212529;
        }
        .fc .fc-button-primary:not(:disabled).fc-button-active {
          background-color: #0d6efd;
          border-color: #0d6efd;
          color: #fff;
        }
        .fc .fc-toolbar-title {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .fc-theme-bootstrap5 a { color: inherit; text-decoration: none; }
        .fc-event { cursor: pointer; border: none; padding: 2px 4px; border-radius: 4px; }
      `}</style>
        </div>
    )
}
