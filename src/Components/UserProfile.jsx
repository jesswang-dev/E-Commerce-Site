import { useSelector } from "react-redux";

export default function UserProfile() {
  const account = useSelector((state) => state.user.account);
  const { name, email, address, createdAt } = account;


  const getFormattedDate = (timeData) => {
    const dateStr = new Date(timeData).toUTCString();
    const date = dateStr.split(" ");
    return `${date[2]} ${date[1]}, ${date[3]}`;
  }

//   console.log(getFormattedDate("Wed, 11 Oct 2023 21:37:56 GMT"));

  return (
    <>
      <div className="profile-container" style={{ width: 600, height: 500 }}>
        <div className="menu-tab"></div>
        <div className="content">
          <div className="profile">
            <div className="header">
              <div className="background-pic"></div>
              <div className="avatar"></div>
              <div className="edit-account"></div>
            </div>
            <div className="profile-info">
              <div className="name">{name}</div>
              <div className="email">{email}</div>
              <div className="address">{address ? address : 'No Address data yet'}</div>
              <div className="datejoined">{getFormattedDate(createdAt)}</div>
            </div>
          </div>
          <div className="orders"></div>
        </div>
      </div>
    </>
  );
}
