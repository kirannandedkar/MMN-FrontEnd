import MMNButton from "@/components/MMNButton";
import React from "react";

const EventButton: React.FC<{ isEventFinished: Boolean, isEventOpenedForRegistration: Boolean}> = ({ isEventFinished, isEventOpenedForRegistration }) => {
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
  
    if (isEventOpenedForRegistration) {
      return <MMNButton title="Register for event" color="purple" />;
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