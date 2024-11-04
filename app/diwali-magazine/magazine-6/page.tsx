import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Diwali Magazine", link: "#" },
  { title: "Magazine 6", link: "#" },
];

const Magazine = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white p-4 sm:p-6 lg:p-8">
          <MMNTitle title="Magazine 6" className="pb-2 mb-4" color="purple" />

          <img src="image/magazine/5.jpg" alt="" />
          <p>
          हितशत्रू…
            <br />
            <br />
            कुणाचे शत्रुत्व, कुणाच्या तरी हितासाठी…

            <br />
            <br />
            <br />
            रिक्षा चालक - ओला उबर टॅक्सी वाले

            <br />
            दुचाकी वाहन चालक - पालिकेची टोविंग व्हॅन

            <br />
            <br />
            टेली मार्केटिंग - कॉलर ॲप

            <br />
            <br />
            मूव्ही थिएटर - फ्री डाऊनलोड वेबसाइट्स

            <br />
            <br />
            रेलवे टिकीट ॲप - ऑटो कॅन्सलेशन टूल

            <br />
            <br />
            पेट्रोल पंप डीलर - ईव्ही बनवणाऱ्या कंपन्या

            <br />
            <br />
            देवळातील भिकारी - देवळाबाहेरील दुकाने

            <br />
            <br />
            रिटेल किराणा मालाचे दुकान - हायपर मॉल

            <br />
            <br />
            <br />- निशिकांत नानिवडेकर


          </p>
        </div>
      </MMNContainer>
    </div>
  );
};

export default Magazine;
