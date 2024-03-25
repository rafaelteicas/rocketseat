import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleClearSelectDateTime() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        onCancelConfirmation={handleClearSelectDateTime}
        schedulingDate={selectedDateTime}
      />
    )
  }

  return <CalendarStep onSelectedDateTime={setSelectedDateTime} />
}
