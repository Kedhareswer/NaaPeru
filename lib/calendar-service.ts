/**
 * In-memory calendar service for managing availability and appointments
 * This could be replaced with a database-backed solution in the future
 */

export interface TimeSlot {
  id: string;
  date: string; // ISO date string
  time: string; // Format: "HH:MM AM/PM"
  available: boolean;
}

export interface Appointment {
  id: string;
  date: string; // ISO date string
  timeSlot: string; // Time slot ID
  name: string;
  email: string;
  meetingType: string;
  topic: string;
  createdAt: string; // ISO date string
}

export interface MeetingType {
  id: string;
  name: string;
  duration: string;
  icon: string; // Icon name reference
}

class CalendarService {
  private timeSlots: TimeSlot[] = [];
  private appointments: Appointment[] = [];
  private meetingTypes: MeetingType[] = [
    { id: 'quick', name: 'Quick Chat', duration: '15 min', icon: 'MessageSquare' },
    { id: 'consultation', name: 'Project Consultation', duration: '30 min', icon: 'User' },
    { id: 'interview', name: 'Interview Discussion', duration: '45 min', icon: 'User' }
  ];
  private currentStatus: 'available' | 'busy' | 'away' = 'available';

  constructor() {
    this.generateInitialTimeSlots();
  }

  // Generate time slots for the next 14 days
  private generateInitialTimeSlots(): void {
    const days = 14;
    const times = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) {
        continue;
      }
      
      const dateString = date.toISOString().split('T')[0];
      
      times.forEach((time, index) => {
        // Randomly set some slots as unavailable
        const available = Math.random() > 0.3; 
        this.timeSlots.push({
          id: `${dateString}-${index}`,
          date: dateString,
          time,
          available
        });
      });
    }
  }

  // Get all available time slots
  getAvailableTimeSlots(date?: string): TimeSlot[] {
    if (date) {
      return this.timeSlots.filter(slot => 
        slot.date === date && slot.available && !this.isBooked(slot.id)
      );
    }
    return this.timeSlots.filter(slot => slot.available && !this.isBooked(slot.id));
  }

  // Get all time slots for a specific date
  getTimeSlotsForDate(date: string): TimeSlot[] {
    return this.timeSlots.filter(slot => slot.date === date).map(slot => ({
      ...slot,
      available: slot.available && !this.isBooked(slot.id)
    }));
  }

  // Check if a slot is already booked
  private isBooked(slotId: string): boolean {
    return this.appointments.some(appointment => appointment.timeSlot === slotId);
  }

  // Book an appointment
  bookAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    // Make sure the time slot exists and is available
    const timeSlot = this.timeSlots.find(slot => 
      slot.id === appointment.timeSlot && 
      slot.available && 
      !this.isBooked(appointment.timeSlot)
    );

    if (!timeSlot) {
      throw new Error("The selected time slot is not available");
    }

    const newAppointment: Appointment = {
      ...appointment,
      id: `appointment-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    this.appointments.push(newAppointment);
    return newAppointment;
  }

  // Get all appointments
  getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  // Get appointment by ID
  getAppointmentById(id: string): Appointment | undefined {
    return this.appointments.find(appointment => appointment.id === id);
  }

  // Get appointments for a specific date
  getAppointmentsForDate(date: string): Appointment[] {
    return this.appointments.filter(appointment => appointment.date === date);
  }

  // Get all meeting types
  getMeetingTypes(): MeetingType[] {
    return [...this.meetingTypes];
  }

  // Get current availability status
  getStatus(): 'available' | 'busy' | 'away' {
    return this.currentStatus;
  }

  // Update availability status
  updateStatus(status: 'available' | 'busy' | 'away'): void {
    this.currentStatus = status;
  }

  // Get available days (days with at least one available slot)
  getAvailableDays(): string[] {
    const availableDays = new Set<string>();
    
    this.timeSlots.forEach(slot => {
      if (slot.available && !this.isBooked(slot.id)) {
        availableDays.add(slot.date);
      }
    });
    
    return Array.from(availableDays).sort();
  }
}

// Create a singleton instance
const calendarService = new CalendarService();

export default calendarService;
