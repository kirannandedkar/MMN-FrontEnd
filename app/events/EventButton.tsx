import MMNButton from "@/components/MMNButton";
import React from "react";

const EventButton: React.FC<{
  isEventFinished: boolean;
  isEventOpenedForRegistration: boolean;
  isEventRegistrationClosed: boolean;
  eventRegistrationLink: string;

}> = ({ isEventFinished, isEventOpenedForRegistration, isEventRegistrationClosed, eventRegistrationLink }) => {
  if (isEventFinished) {
    return (
      <MMNButton
        title="This event is over"
        disabled={true}
        className="border-[1px] border-[#99a2b4] text-[#00205B] opacity-75"
        size="normal"
      />
    );
  }

  if (isEventRegistrationClosed) {
    return (
      <MMNButton
        title="Registration Closed"
        disabled={true}
        className="border-[1px] border-[#99a2b4] text-[#00205B] opacity-75"
        size="normal"
      />
    );
  }
  
  if (isEventOpenedForRegistration) {
    return (
      <div
        onClick={() =>
          (window.location.href = eventRegistrationLink)
        }
      >
        <MMNButton title="Register for event" color="purple" />
      </div>
    );
  }

  return (
    <MMNButton
      title="Coming soon"
      disabled={true}
      className="border-[1px] border-[#00205B] text-[#00205B]"
      size="normal"
    />
  );
};

export default EventButton;
