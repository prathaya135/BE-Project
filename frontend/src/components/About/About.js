import React from 'react'; 

const teamMembers = [
  {
    name: "Prathamesh Bhokare",
    role: "Frontend developer",
    contact: "+91 9975583478"
  },
  {
    name: "Mohak Borole",
    role: "Backend developer",
    contact: "+91 8669114598"
  },
  {
    name: "Namya Agrawal",
    role: "Backend developer & ML specialist",
    contact: "+91 6269218018"
  },
  {
    name: "Shravani Bhosle",
    role: "ML specialist",
    contact: "+91 8446648460"
  }
];

const TeamMemberCard = ({ member }) => {
  return (
    <div style={cardStyle}>
      <i><h2>{member.name}</h2></i>
      <i><strong>Role:</strong> {member.role}</i>
      <p><i><strong style={{color:"red"}}>Contact:</strong> {member.contact}</i></p>
    </div>
  );
};

const TeamMembersList = () => {
  return (
    <div style={{marginTop:"150px"}}>
    <h2 style={{textAlign:"center",backgroundColor:"#4f95e1",padding:"2px 4px",borderRadius:"4px"}}>OUR TEAM</h2>
    <div style={containerStyle} className='container'>
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </div>
    <div style={{textAlign:"center"}}>
      <a href="https://github.com/prathaya135/BE-Project" target='_blank'><h3>GITHUB LINK</h3></a>
    </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '20px',
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '15px',
  margin: '10px',
  width: '300px',
  boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  backdropFilter: 'blur(10px)',
  position: 'relative',
};

export default TeamMembersList;
