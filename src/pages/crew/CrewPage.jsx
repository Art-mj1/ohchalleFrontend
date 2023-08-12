import { CrewPageBlock } from './CrewPage.style';
import MyProfile from '../../components/myprofile/MyProfile';
import Crew from '../../components/crew/Crew';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CrewPage() {
  const [loggedin, setLoggedin] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    CheckuserInfo();
  }, []);

  //유저프로필 요청
  const CheckuserInfo = async () => {
    try {
      const access = localStorage.getItem("Access");
      const refresh = localStorage.getItem("Refresh");
      const currentUserToken = {
        headers: {
          Access: `${access}`,
          Refresh: `${refresh}`,
        },
      };
      const response = await axios.get(
        "https://api.ohchall.shop/api/auth/mypage",
        currentUserToken
      );

      console.log("API response:", response);

      if (response.status === 200) {
        console.log("API response is successful");
        return setLoggedin(true);
      } else {
        setLoggedin(false);
        return false;
      }
    } catch (error) {
      setLoggedin(false);
      return false;
    }
  };
  console.log(loggedin);
  return (
    <CrewPageBlock>
      {loggedin ? <MyProfile /> : null}
      <Crew />
    </CrewPageBlock>
  );
}

export default CrewPage;
