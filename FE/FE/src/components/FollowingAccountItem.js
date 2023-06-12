import React, { useState } from "react";

import { Hashicon } from "@emeraldpay/hashicon-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileId } from "../feature/checkProfile/checkProfileSlice";
import { unfollowAccount } from "../feature/followingAccounts/followingAccountSlice";

import { Button , Table} from "react-bootstrap";
import { RiCheckFill, RiDeleteBin6Line } from "react-icons/ri";

function FollowingAccountItem(props) {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(
    (state) => state.checkProfileReducer.profileId
  );

  const [followButtonTitle, setFollowButtonTitle] = useState("Unfollow");
  const [tickIconStatus, setTickIconStatus] = useState(false);

  function handleFollowButtonClick(e) {
    dispatch(
      unfollowAccount({
        followedId: props.id,
        followerId: localStorage.getItem("psnUserId"),
      })
    );
    setFollowButtonTitle("Unfollowed");
    setTickIconStatus(true);
  }

  function handleClick(e) {
    dispatch(getProfileId(props.id));
  }

  return (
    <tr>
    <td  style={{ padding: "10px" }}>
      <Hashicon value={props.id} size={50} />
    </td>
    <td  style={{ padding: "10px" }}>
      <Link
        to="/newsfeed/profile"
        className="text-decoration-none text-dark"
        onClick={handleClick}
        style={{ fontSize: "20px" }}
      >
        {props.firstName + " " + props.lastName}
      </Link>
    </td>
    <td style={{ padding: "10px" }}>
      <Button
        variant={tickIconStatus ? "danger" : "success"}
        onClick={handleFollowButtonClick}
        style={{ backgroundColor: "#3d85c6" }}
      >
        {followButtonTitle}{" "}
        {tickIconStatus ? <RiCheckFill /> : <RiDeleteBin6Line />}
      </Button>
    </td>
  </tr>
  );
}

export default FollowingAccountItem;
