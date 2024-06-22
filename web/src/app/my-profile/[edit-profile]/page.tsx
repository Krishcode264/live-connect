import { InfoTemplate, InfoTemplateWithIntrests, InfoTemplateWithOptions } from
 '@/components/my-profile/Ui'
import React from 'react'

const page = () => {
    const intrests = ["Yoga", "Travel", "Cooking", "reading", "Music"];
    const languagesSpeak = ["Marathi", "Hindi", "English"];
    const lnaguageslearning = ["Spanish", "French"];
    const countiresVisit = ["Spain", "France", "Switzerland", "US"];

  return (
    <div className="p-2">
      <h2 className="text-slate-900 text-2xl relative font-semibold">Edit Profile</h2>
      <h3 className="text-slate-400 text-xl my-1">Personal Information</h3>
      <div className="flex flex-wrap">
        <InfoTemplate property="First name" value="krish" />
        <InfoTemplate property="Last name" value="zade" />
        <InfoTemplate property="User name" value="krish264" />
        <InfoTemplate property="Email address" value="email@gmail.com" />
        <InfoTemplateWithOptions
          property="Gender"
          value="Male"
          options={["Male", "Female", "Other"]}
        />
        <InfoTemplateWithOptions
          property="Sexuality"
          value="Stright"
          options={[
            "Stright",
            "Gay",
            "Lesbian",
            "Pansexual",
            "Bisexual",
            "Queer",
            "Other",
          ]}
        />
        <InfoTemplateWithOptions
          property="Pronouns"
          value="He/Him"
          options={["He/Him", "She/Her", "They/Them"]}
        />
      </div>
      <h3 className="text-slate-400 text-xl my-1">Intrests</h3>
      <InfoTemplateWithIntrests intrests={intrests} />
      <h3 className="text-slate-400 text-xl my-1">Languages i speak</h3>
      <InfoTemplateWithIntrests intrests={languagesSpeak} />
      <h3 className="text-slate-400 text-xl my-1">Languages i am learning</h3>
      <InfoTemplateWithIntrests intrests={lnaguageslearning} />
      <h3 className="text-slate-400 text-xl my-1">
        Countries i want to travel
      </h3>
      <InfoTemplateWithIntrests intrests={countiresVisit} />
    </div>
  );
}

export default page