import styled from "styled-components";

const Avatar = styled.img`
    width : 200px;
    height : 200px;
    border-radius : 100%;
    filter: drop-shadow(0 0 0.75rem #F0C4C3);
    &:hover {
        cursor : pointer;
    }
`;

export default Avatar;
