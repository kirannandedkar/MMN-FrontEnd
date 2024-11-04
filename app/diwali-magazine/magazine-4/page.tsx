import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Diwali Magazine", link: "#" },
  { title: "Magazine 4", link: "#" },
];

const Magazine4 = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white p-4 sm:p-6 lg:p-8">
          <MMNTitle title="Magazine 4" className="pb-2 mb-4" color="purple" />
          <p>
            सूर्य तू चंद्रमा  सारे निळे आकाश तू तिमिरात देण्या साथ माझी माझ्या
            सवे खद्योत तू कितीदा मला घेऊन आला जल खडक त्या पंकातूनी जरी जाहल्या
            मज खूप ठेचा तुझ्यावर विश्वासूनी
          </p>
          <br />
          <p>
            नाही तुला मी प्रार्थना केली कधी नाहीच आभारी तुझा मी सर्व जग आक्रमिले
            ही असे माझी सृजा
          </p>
          <br />
          <p>
            का पोट माझे सांगते पाठीस केल्या कष्ट की आभार त्याचे मानते जगलो मी
            त्याला झिजवूनी
          </p>
          <br />
          <p>
            कोणी कुणाचे मागणे  आभार माझ्या जीवनी ते दोन्ही रोजच कष्टती देह चर्या
            चालती
          </p>
          <br />
          <p>
            एक पत्नी आणि यजमान वाटते ते एकमेका साह्य करण्या पातले परी योजना
            त्याची असे मानव टिकावा भूतली
          </p>
          <br />
          <p>
            आभार ते कोणी कुणाचे दान ते सब ईश्वराचे कार्य त्याचे पूर्ण करण्या तोच
            आत्मा होय नाचे
          </p>
          <br />
          <p>
            हे मी केले ते मी केले व्यर्थ सर्वही वल्गना आपण असो तव बाहुले तो आपला
            करी खेळणा
          </p>
          <br />
          <p>
            म्हणून नाही कोणी कोणा आभार मानावे कुणाचे नाटकातील पात्र आपण काम
            दिधले तेच साचे
          </p>
          <br />
          <p>
            जन्म आणि मरण यातील आपला हा जोगवा अंतरीची साद ऐकून कर्म होते वाहवा
          </p>
          <br />
          <p>
            मीच त्याचा एक बिंदू तो किती क्षण भंगुर मी किती केले म्हणावे कर्म
            करिता ईश्वर
          </p>
          <br />
          <p>सतीश वागळे (शलाका जोशी)</p>
        </div>
      </MMNContainer>
    </div>
  );
};

export default Magazine4;
