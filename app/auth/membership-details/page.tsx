"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import FamilyInfo from "@/app/auth/membership-details/FamilyInfo";
import { GET, DELETE, POST } from "@/utils/fetch-factory";
import { FamilyMember, ProfileInfo } from "@/constants/types";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import MMNTitle from "@/components/MMNTItle";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";
import MMNButton from "@/components/MMNButton";
import AddFamilyMemberForm from "./AddFamilyMemberForm";
import { camelCaseToSentenceCase, validatedForm } from "@/utils/form";
import PaymentCard from "./PaymentCard";
import { isOlder16 } from "@/utils/funcs";
import Modal from "@/components/Modal";
import ProfileUpdateForm from "./ProfileUpdateForm";
import MemberUpdateForm from "./MemberUpdateForm";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Auth", link: "#" },
  { title: "Membership details", link: "#" },
];

const initialFamilyMember = {
  id: "N/A",
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  relation: "",
};

const Page = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<ProfileInfo | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPaymentConfirmOpen, setPaymentConfirmOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [addFamilyMemberForm, setFamilyMemberFormVisible] = useState(false);
  const [isSubmitBtnLoading, setSubmitBtnLoading] = useState(false);
  const [membershipFee, setMembershipFee] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const { authresult } = useSelector((state: any) => state.auth);
  const [familyMember, setFamilyMember] =
    useState<FamilyMember>(initialFamilyMember);
  const [errorState, setErrorState] =
    useState<FamilyMember>(initialFamilyMember);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isMemberUpdateModalOpen, setMemberUpdateModalOpen] = useState(false);
  useEffect(() => {
    if (!authresult) {
      router.push("/home");
    }
  }, [authresult]);

  useEffect(() => {
    if (authresult) fetchData();
  }, []);

  const fetchData = async () => {
    const userInfo: ProfileInfo = await GET("/proxy/user/me");
    const { price } = await GET("/proxy/subscription-plan");
    setMembershipFee(price / 100);
    setUserInfo(userInfo);
    getFamilyMembers();
    setLoading(false);
  };
  const getFamilyMembers = async () => {
    const { isSubscribed } = await GET("/proxy/user/subscription");
    let count = isSubscribed ? 0 : 1;
    const familyMembers = await GET("/proxy/family-members");
    for (let index = 0; index < familyMembers.length; index++) {
      const member = familyMembers[index];
      if (!member.isPaid && isOlder16(member?.dateOfBirth)) {
        count++;
      }
    }
    setMemberCount(count);
    setFamilyMembers(familyMembers);
  };

  const handleConfirm = async () => {
    setIsDialogOpen(false);
    const response = await DELETE(
      `/proxy/family-members/${selectedMemberId}`,
      {}
    );
    if (response.isSuccess) {
      toast.success("Family member has been deleted");
      getFamilyMembers();
    } else {
      toast.error(response.message);
    }
  };

  const removeFamilyMember = (id: string) => {
    setSelectedMemberId(id);
    setIsDialogOpen(true);
  };

  const onInputChangedHandler = (
    value: string | undefined | null,
    fieldName: string
  ) => {
    const updatedAccount = { ...familyMember };
    updatedAccount[fieldName] = value;

    setErrorState(validate(errorState, value, fieldName));
    setFamilyMember(updatedAccount);
  };

  const validate = (
    formState: FamilyMember,
    value: string | undefined | null,
    fieldName: string
  ) => {
    const updated = { ...formState };
    if (value == null || value === "")
      updated[fieldName] = `${camelCaseToSentenceCase(
        fieldName
      )} field is required`;
    else updated[fieldName] = null;
    return updated;
  };

  const onAddFamilyMemberHandler = async () => {
    const validationResult = validatedForm<FamilyMember>(
      errorState,
      familyMember
    );
    const validateState: FamilyMember = {
      ...validationResult.updatedErrorState,
    };

    setErrorState(validateState);
    if (validationResult.isValid) {
      setSubmitBtnLoading(true);
      const response = await POST("/proxy/family-members", [familyMember]);

      if (response.isSuccess) {
        setSubmitBtnLoading(false);
        setFamilyMemberFormVisible(false);
        setFamilyMember(initialFamilyMember);
        setErrorState(initialFamilyMember);
        toast.success("Family member addedd successfully!");
        getFamilyMembers();
      } else {
        toast.error(response.message);
      }
    }
  };

  const paymentBtnClickedHandler = async () => {
    if (addFamilyMemberForm) {
      toast.info("Please submit member form then payment");
      return;
    }
    setPaymentConfirmOpen(true);
  };

  const processPayment = async () => {
    router.push("/payment/checkout");
  };

  const successProfileUpdateHandler = (profileInfo: ProfileInfo) => {
    setUserInfo(profileInfo);
    setProfileModalOpen(false);
  };

  const editMember = (id: string) => {
    setSelectedMemberId(id);
    setMemberUpdateModalOpen(true);
  };

  if (loading) return <Loader></Loader>;
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="flex flex-col gap-[20px] grow-[2]">
          <div className="flex flex-col gap-[10px] line-height-mmn-large">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
              <MMNTitle
                title="Primary member information"
                color="purple"
                className={"mb-3"}
              />

              <div className="text-end">
                <button
                  onClick={() => setProfileModalOpen(true)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] ">
              <div>
                <div className="pb-[5px]">First name</div>
                <input
                  type="text"
                  className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                  placeholder="Enter First Name"
                  disabled={true}
                  value={userInfo?.firstName}
                />
              </div>

              <div>
                <div className="pb-[5px]">Last name</div>
                <input
                  type="text"
                  className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                  placeholder="Enter Last Name"
                  disabled={true}
                  value={userInfo?.lastName}
                />
              </div>

              <div>
                <div className="pb-[5px]">Gender</div>
                <input
                  type="text"
                  className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                  disabled={true}
                  value={userInfo?.gender}
                />
              </div>

              <div>
                <div className="pb-[5px]">Date of Birth</div>
                <input
                  type="text"
                  className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                  disabled={true}
                  value={userInfo?.fomatedDateOfBirth}
                />
              </div>

              <div>
                <div className="pb-[5px]">Mobile no</div>
                <input
                  type="text"
                  className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                  disabled={true}
                  value={userInfo?.phoneNumber}
                />
              </div>

              <div>
                <div className="pb-[5px]">Kommune</div>
                <input
                  type="text"
                  className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                  disabled={true}
                  value={userInfo?.muncipality}
                />
              </div>

              <div>
                <div className="pb-[5px]">Email id</div>
                <input
                  type="text"
                  className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                  placeholder="email@email.no"
                  disabled={true}
                  value={userInfo?.email}
                />
              </div>
            </div>
          </div>
          <MMNTitle title="Family members" color="purple" />
          {familyMembers.map((account, index) => {
            return (
              <FamilyInfo
                key={index}
                account={account}
                removeMember={removeFamilyMember}
                editMember={editMember}
              />
            );
          })}

          {addFamilyMemberForm ? (
            <AddFamilyMemberForm
              isSubmitBtnLoading={isSubmitBtnLoading}
              account={familyMember}
              onAddFamilyMemberHandler={onAddFamilyMemberHandler}
              errorState={errorState}
              onChangeHandler={onInputChangedHandler}
            />
          ) : (
            ""
          )}
          {addFamilyMemberForm ? (
            ""
          ) : (
            <div className="flex">
              <div onClick={() => setFamilyMemberFormVisible(true)}>
                <MMNButton
                  title={"+ Add family member"}
                  color="white"
                  className={"border border-color-mmn-purple"}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="sticky top-[20px]">
            {memberCount > 0 ? (
              <PaymentCard
                memberCount={memberCount}
                processClicked={paymentBtnClickedHandler}
                MembershipFee={membershipFee}
              />
            ) : (
              <div className="flex flex-col w-80"> &nbsp;</div>
            )}
          </div>
        </div>
      </MMNContainer>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Action"
        message="Are you sure you want to remove member?"
      />

      <ConfirmDialog
        isOpen={isPaymentConfirmOpen}
        onClose={() => setPaymentConfirmOpen(false)}
        onConfirm={processPayment}
        title="Confirm Action"
        message="Are you sure you want to process payment?"
      />

      {profileModalOpen ? (
        <Modal
          isOpen={profileModalOpen}
          title="Profile Update"
          onClose={() => setProfileModalOpen(false)}
        >
          <ProfileUpdateForm
            userInfo={userInfo}
            updatedSuccess={successProfileUpdateHandler}
          ></ProfileUpdateForm>
        </Modal>
      ) : (
        ""
      )}

      {isMemberUpdateModalOpen ? (
        <Modal
          isOpen={isMemberUpdateModalOpen}
          title="Member Update"
          onClose={() => setMemberUpdateModalOpen(false)}
        >
          <MemberUpdateForm
            userInfo={familyMembers.find((item) => item.id === selectedMemberId)}
            updatedSuccess={() => {
              getFamilyMembers();
              setMemberUpdateModalOpen(false);
            }}
          ></MemberUpdateForm>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
