import { CheckuserInfo } from "../../api/AuthApi";
import { getCrews } from "../../api/mock/CrewApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import Category from "../../components/category/Category";
import EventBanner from "../../components/banner/EventBanner";
import {
  MainPageSection,
  RecentCrewList,
  TitleContainer,
  TopCrewList,
  SuggestCrewList,
} from "./MainPage.style";
import LatestCrewList from "../../components/common/LatestCrewList";
import R9dCrewList from "../../components/common/R9dCrewList";
import PopularCrewList from "../../components/common/PopularCrewList";
import MyProfile from "../../components/myprofile/MyProfile";
import { useEffect, useState } from "react";

function MainPage() {
  const navigate = useNavigate();
  const access = localStorage.getItem("Access");
  const refresh = localStorage.getItem("Refresh");
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    // console.log("triggered");
    const getUserInfo = async () => {
      const isUserLoggedIn = await CheckuserInfo();
      setLoggedin(isUserLoggedIn);
    };
    if (access && refresh) {
      getUserInfo();
    }
  }, [access, refresh]);

  const onClickCrew = (itemId) => {
    navigate(`/crew/${itemId}`);
  };

  const { data, isLoading, error } = useQuery(["crews"], getCrews);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <>
      <MainPageSection>
        {loggedin ? <MyProfile /> : null}
        <Banner />
        <Category />

        <RecentCrewList>
          <TitleContainer>
            <h1>최신 크루 리스트</h1>
            <button>더보기</button>
          </TitleContainer>

          <LatestCrewList data={data} onClickCrew={onClickCrew} />
        </RecentCrewList>

        <TopCrewList>
          <TitleContainer>
            <h1>인기 크루 리스트</h1>
            <button>더보기</button>
          </TitleContainer>

          <PopularCrewList data={data} onClickCrew={onClickCrew} />
        </TopCrewList>

        <SuggestCrewList>
          <TitleContainer>
            <h1>추천 크루 리스트</h1>
            <button>더보기</button>
          </TitleContainer>

          <R9dCrewList data={data} onClickCrew={onClickCrew} />
        </SuggestCrewList>

        <EventBanner />
      </MainPageSection>
    </>
  );
}

export default MainPage;
