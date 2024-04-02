import MMNTitle from "@/components/MMNTItle";
import MMNPanel from "@/components/MMNPanel";
import MMNButton from "@/components/MMNButton";

export default function VolunteerCard(){
    return (
        <MMNPanel className="">
            <MMNTitle title="Become volunteer" color="purple" />
            <div className="line-height-mmn-large">
                MMN is an organisation for members, by members - run on support of our volunteer members. If you have the skill and time to offer for MMS community's benefit, we need you !
            </div>

            <div className="flex justify-end">
                <MMNButton title="Become volunteer" color="purple" />
            </div>
        </MMNPanel>
    )
}
