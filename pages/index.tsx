import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

const WelcomeBanner = styled.div`
  height: 100%;
`;

const TitleBanner = styled.h1`
  font-size: 220px;
  margin: 0;
`;

const DescBanner = styled.h3`
  font-size: 73px;
  margin: 0;
  font-weight: 500;
`;

const MoriiHello = styled(TitleBanner)`
  font-size: 98px;
`;
const MoriiCreator = styled(DescBanner)`
  font-size: 45px;
`;

const MoriiLetter = styled.p`
  font-size: 30px;
  letter-spacing: 3.5px;
`;

const MoriiIntroduction = styled(WelcomeBanner)`
  padding: 10%;
  position: relative;
`;

const PageIndicator = styled.div`
  position: absolute;
  text-align: right;
  font-weight: 500;
  font-size: 20px;
  bottom: 20px;
  right: 30px;
  padding-bottom : 5px;

  &:after {
    content : '';
    border-bottom: 2px solid black;
    position: absolute;
    width: 25%;
    height : 2px;
    bottom: 0px;
    right: 0px;
    transition : width 0.6s;
  }

  &:hover:after{
    width : 100%;
    transition: width 0.6s;
  }

`;

// const PageTitle = styled.p`
//   bottom: 20px;
//   right: 30px;
//   text-align: right;
//   font-weight: 500;
//   font-size: 20px;
//   position: absolute;
//   margin-bottom: 9px;
// `;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Morii</title>
      </Head>
      <WelcomeBanner className="flex flex-column x-center y-center">
        <TitleBanner>Morii.</TitleBanner>
        <DescBanner>A place for you to lean on tired day</DescBanner>
      </WelcomeBanner>
      <MoriiIntroduction className="flex y-center">
        <div>
          <MoriiHello>Hello</MoriiHello>
          <MoriiCreator>
            My name is <b>Morii Shikaa</b>
          </MoriiCreator>
          <MoriiLetter>
            The Creator of the forest full of pages <br />
            filled with the outpouring of hearts and thoughts. <br />
            <br />
            The pages that have been provided in this forest are <br />
            intended for everyone who just wants to visit, relax and <br />
            just want to know what&apos;s on the mind of a loner at night.
            <br />
            <br />
            I hope you like this forest and visit this place anew in whatever
            <br />
            condition your heart is in. Nice to know you, hope you like <br />
            this forest and thank you for visiting or even intend <br />
            to come back.
          </MoriiLetter>
        </div>
        <PageIndicator>
          warm welcome from <br />
          the forest
        </PageIndicator>
      </MoriiIntroduction>
    </>
  );
};

export default Home;
