import styled from "styled-components";
import LineInput from "../components/LineInput";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../atom/atoms";
import { userState } from "../atom/userAtom";
import { useEffect, useState } from "react";
import { postMake } from "../api/postmake";
import { postUpdate } from "../api/postpatch";
import { getIdDetail } from "../api/getboarddetail";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Radio from "../components/Radio";

const Title = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #56d8bc;
  margin-top: 20px;
  border-bottom: 4px solid #56d8bc;
  padding-bottom: 20px;
`;

const StyledForm = styled.form`
  width: 700px;
  margin: 40px auto;
`;

const OneLineInput = styled(LineInput)`
  margin-bottom: 5px;

  & label {
    margin-left: 5px;
    font-weight: 600;
  }

  & span {
    margin-left: 5px;
    color: #ff0000;
  }

  & input {
    border: 1px solid #959595;
    height: 38px;
    padding: 0 13px;
  }
`;

const ShortInput = styled(LineInput)`
  width: 250px;
  margin-bottom: 5px;

  & label {
    margin-left: 5px;
    font-weight: 600;
  }

  & span {
    margin-left: 5px;
    color: #ff0000;
  }

  & input {
    border: 1px solid #959595;
    height: 38px;
    padding: 0 13px;
  }
`;

const Styledtextarea = styled.textarea`
  width: 700px;
  height: 100px;
  font-size: 15px;
  resize: none;
  border-radius: 5px;
  padding: 7px 13px;
`;

const RowFlexBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 40px;
`;

const RadiosContainer = styled.div`
  margin: 5px 0;

  & .radios {
    display: flex;
    gap: 20px;
  }

  & h3 {
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
  }

  & span {
    margin-left: 5px;
    color: #ff0000;
  }
`;

const StyledRadio = styled(Radio)`
  display: flex;
  align-items: center;

  & input {
    display: none;
    
  }

  & input:checked +label{
    background-color: #6bddc4;
  }

  & label {
    display: block;
    border-radius: 10px;
    background-color:#ffffff;
    text-align: center;
    padding:5px 10px;
    box-shadow: 1px 1px 2.5px 1px rgba(0, 0, 0, 0.2);
`;

const DescriptionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  margin: 30px auto;
  display: block;
  background-color: #6bddc4;
  color: #ffffff;
  font-weight: 600;
  border: 0;
  border-radius: 5px;
  padding: 7px 16px;

  &:disabled {
    background-color: #d5d5d5;
  }
`;

function PostMakePage() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const user = useRecoilValue(userState);
  const location = useLocation();

  // 쿼리 파라미터 추출
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode"); // "edit" 또는 null
  const gatheringpost_id = query.get("id"); // 게시물 ID

  const [clubInfo, setClubInfo] = useState({
    name: "",
    subject: "",
    chat_link: "",
    activity_scope: "online",
    status: "recruiting",
    location: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // 서버로부터 데이터 받아오기
        const data = await getIdDetail(gatheringpost_id);

        // 상태 업데이트
        setClubInfo({
          name: data.name || "",
          subject: data.subject || "",
          chat_link: data.chat_link || "",
          activity_scope: data.activity_scope || "online", // 기본값 설정
          status: data.status || "recruiting", // 기본값 설정
          location: data.location || "",
          description: data.description || "",
        });
        setIsEditing(true);
      } catch (error) {
        // 오류 처리
        console.error("게시글 로드 실패:", error.message);
      }
    };

    // 모드가 'edit'이고 gatheringpost_id가 유효한 경우에만 fetchPostData 호출
    if (mode === "edit" && gatheringpost_id) {
      fetchPostData();
    } else {
      setIsEditing(false);
    }
  }, [mode, gatheringpost_id]);

  const handleClubInfoChange = (e) => {
    const { name, value } = e.target;
    setClubInfo((prevClubInfo) => ({
      ...prevClubInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await postUpdate(gatheringpost_id, clubInfo);
        alert("모임이 성공적으로 수정되었습니다.");
      } else {
        await postMake(clubInfo);
        alert("모임이 성공적으로 등록되었습니다.");
      }
      navigate("/board");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Title>{isEditing ? "모임 수정하기" : "모임 만들기"}</Title>
      <StyledForm onSubmit={handleSubmit}>
        <OneLineInput
          type="text"
          content="모임 이름"
          value={clubInfo.name}
          name="name"
          onChange={handleClubInfoChange}
          required
        />
        <OneLineInput
          type="text"
          content="모임 주제"
          value={clubInfo.subject}
          name="subject"
          onChange={handleClubInfoChange}
          required
        />
        <OneLineInput
          type="url"
          content="모임 단톡방 링크"
          value={clubInfo.chat_link}
          name="chat_link"
          onChange={handleClubInfoChange}
        />
        <RowFlexBox>
          <RadiosContainer>
            <h3>
              활동 범위<span>*</span>
            </h3>
            <div className="radios">
              <StyledRadio
                name="activity_scope"
                value="online"
                title="온라인"
                checked={clubInfo.activity_scope === "online"}
                onChange={handleClubInfoChange}
              />
              <StyledRadio
                name="activity_scope"
                value="offline"
                title="오프라인"
                checked={clubInfo.activity_scope === "offline"}
                onChange={handleClubInfoChange}
              />
              <StyledRadio
                name="activity_scope"
                value="etc"
                title="기타"
                checked={clubInfo.activity_scope === "etc"}
                onChange={handleClubInfoChange}
              />
            </div>
          </RadiosContainer>
          <RadiosContainer>
            <h3>
              모집 현황<span>*</span>
            </h3>
            <div className="radios">
              <StyledRadio
                name="status"
                value="recruiting"
                title="모집중"
                checked={clubInfo.status === "recruiting"}
                onChange={handleClubInfoChange}
              />
              <StyledRadio
                name="status"
                value="closed"
                title="모집마감"
                checked={clubInfo.status === "closed"}
                onChange={handleClubInfoChange}
              />
            </div>
          </RadiosContainer>
        </RowFlexBox>
        <ShortInput
          type="text"
          content="활동 지역"
          value={clubInfo.location}
          name="location"
          onChange={handleClubInfoChange}
        />
        <DescriptionTitle>모임 설명</DescriptionTitle>
        <Styledtextarea
          value={clubInfo.description}
          name="description"
          onChange={handleClubInfoChange}
        />
        <SubmitButton type="submit">
          {isEditing ? "수정 완료" : "모임 만들기"}
        </SubmitButton>
      </StyledForm>
    </>
  );
}

export default PostMakePage;
