import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getContactErrorMessage, sendAppointmentRequest } from '../../lib/contact';
import { fadeIn, viewportOnce } from '../../lib/motion';
import BookingDetailsStep from './BookingDetailsStep';
import BookingScheduler from './BookingScheduler';
import BookingSuccess from './BookingSuccess';
import { getDefaultTimezone, toISODateString } from './booking.utils';

const initialForm = { name: '', email: '', message: '' };

export default function BookingFlow({ about }) {
  const [step, setStep] = useState('schedule');
  const [duration, setDuration] = useState(30);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timezone, setTimezone] = useState(getDefaultTimezone);
  const [use24h, setUse24h] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const canContinue = Boolean(selectedDate && selectedTime);

  const resetBooking = useCallback(() => {
    setStep('schedule');
    setSelectedDate(null);
    setSelectedTime(null);
    setForm(initialForm);
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendAppointmentRequest({
        name: form.name,
        email: form.email,
        message: form.message,
        duration,
        appointmentDate: toISODateString(selectedDate),
        appointmentTime: selectedTime,
        timezone,
      });
      toast.success('Appointment booked — we will confirm by email shortly.');
      setStep('success');
    } catch (err) {
      toast.error(getContactErrorMessage(err, 'Could not book appointment. Try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeIn}
      className="booking-flow"
      data-name="booking-flow"
    >
      <AnimatePresence mode="wait">
        {step === 'schedule' && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <BookingScheduler
              about={about}
              duration={duration}
              onDurationChange={setDuration}
              viewDate={viewDate}
              onViewDateChange={setViewDate}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              timezone={timezone}
              onTimezoneChange={setTimezone}
              use24h={use24h}
              onToggle24h={setUse24h}
              canContinue={canContinue}
              onContinue={() => setStep('details')}
            />
          </motion.div>
        )}

        {step === 'details' && selectedDate && selectedTime && (
          <motion.div
            key="details"
            className="booking-widget"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <BookingDetailsStep
              duration={duration}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              timezone={timezone}
              use24h={use24h}
              form={form}
              onChange={setForm}
              onBack={() => setStep('schedule')}
              onSubmit={handleBook}
              submitting={submitting}
            />
          </motion.div>
        )}

        {step === 'success' && selectedDate && selectedTime && (
          <motion.div
            key="success"
            className="booking-widget"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BookingSuccess
              duration={duration}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              timezone={timezone}
              use24h={use24h}
              onBookAnother={resetBooking}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
