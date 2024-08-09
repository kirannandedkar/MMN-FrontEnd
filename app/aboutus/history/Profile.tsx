import React from 'react';

type Member = {
  image: string;
  name: string;
};

type ProfileProps = {
  member: Member;
};

const Profile: React.FC<ProfileProps> = ({ member }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="flex items-center p-4">
        <img
          className="w-[130px] h-[130px] rounded-full border"
          src={member.image}
          alt="Profile"
        />
        <div className="ml-4">
          <table className="min-w-full text-left text-sm">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold">{member.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
