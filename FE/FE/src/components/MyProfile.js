import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfilePosts } from "../feature/checkProfile/checkProfileSlice";
import { getProfileInfo } from "../feature/checkProfile/checkProfileSlice";
import { setEditedPostContent } from "../feature/checkProfile/checkProfileSlice";
import PostItem from "./PostItem";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer, toast } from "react-toastify";

function MyProfile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.checkProfileReducer.postList);
  const userInfo = useSelector(
    (state) => state.checkProfileReducer.profileInfo
  );
  // const editedPostContent = useSelector(
  //   (state) => state.checkProfileReducer.editedPostContent // new selector for edited post content
  // );
  function showSuccessMessage(inputMessage) {
    toast.success(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function showFailMessage(inputMessage) {
    toast.error(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  const [editPostId, setEditPostId] = useState(null);
  const [editedPostContent, setEditedPostContent] = useState("");
  const [BioContent, setBioContent] = useState(localStorage.getItem("psnUserFirstName") ?localStorage.getItem("psnUserFirstName"):"illa");
  const [submitting, setSubmitting] = useState(false);
// useState
// "psnUserFirstNamepsnUserFirstName") ?localStorage.getItem("psnUserFirstName") :"illa daß" 
  const schema = yup.object().shape({
    bio: yup.string().required("Bio is required"),
  });

  async function handleSubmit(values) {
    setSubmitting(true);

    const { bio } = values;

    let obj = {
      "firstName":localStorage.getItem("psnUserFirstName"),
      "lastName":localStorage.getItem("psnUserLastName"),
      "email":localStorage.getItem("psnUserEmail"),
      "password":"123456",
      "role": "user",
      "id": localStorage.getItem("psnUserId"),
      "nic":localStorage.getItem("nic"),
      "bio":bio
    }
    try {
      const response = await axios({
        method: "put",
        url: "/api/v1/users/update",
        headers: {
          Authorization: localStorage.getItem("psnToken"),
        },
        data: obj
      });
      // const response = await axios.patch("/api/user", { bio });
      localStorage.setItem("psnBio", response.data.payload.user.bio);

      // Handle successful submission
      console.log(response.data);
      // props.onSuccess();
    } catch (error) {
      // Handle submission error
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }


  useEffect(() => {
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }

    if (localStorage.getItem("psnUserId") !== null) {
      dispatch(getProfilePosts(localStorage.getItem("psnUserId")));
      dispatch(getProfileInfo(localStorage.getItem("psnUserId")));
    }
  }, []);

  const handleEditPost = (postItem) => {
    setEditPostId(postItem.id);
    setEditedPostContent(postList.find(post => post.id === postItem.id).content);
    let obj = {}
    const update = Object.assign({},postItem)
    update['content'] = "Sdsds"
    console.log(update);
    console.log(
      obj
    );

  };
  async function createPost(obj) {
    try {
      const response = await axios({
        method: "put",
        url: "/api/v1/editpost",
        headers: {
          Authorization: localStorage.getItem("psnToken"),
        },
        data: obj
      });

      if (response.data !== null && response.data.status === "success") {
        showSuccessMessage("update successfully!");
        // setPostContent("");
        // setPostContentCount(0);
        // setDisablePostButton(true);
        // setFile64String(null);
        // setFile64StringWithType(null);
        window.location.reload()
        console.log("success");
        }

      if (response.data !== null && response.data.status === "fail") {
        // showFailMessage("Post failed. Please try again later!");
        console.log("fail");

      }
    } catch (error) {
      console.log("erroe");

      // showFailMessage("Post failed. Please try again later!");
    }
  }
  const handleSavePost = (postItem) => {
    console.log(postItem,"log update");
    let obj = Object.assign({}, postItem)
    if (obj['content']) {
      obj.content = "sdsd"
      console.log(obj);
      obj['content'] = editedPostContent
    } else {
      console.log("BAD");
    }
    createPost(obj)

    // let token = localStorage.getItem("psnToken")
    //     axios.put('http://localhost:8080/api/v1/editpost', obj, { headers: { 'Authorization': token } })
    //       .then(response => {
    //         // handle response
    //       })
    //       .catch(error => {
    //         // handle error
    //       });
    // const updatedPostList = postList.map((post) => {
    //   if (post.id === postId) {
    //     return { ...post, content: editedPostContent };
    //   }
    // setEditPostId(null);
    // Update the postList state with the new content
    // dispatch({ type: "checkProfile/setPostList", payload: updatedPostList });
  };
  async function deletePost(obj) {
    try {
      const response = await axios({
        method: "delete",
        url: "/api/v1/deletepost",
        headers: {
          Authorization: localStorage.getItem("psnToken"),
        },
        data: obj
      });

      if (response.data !== null && response.data.status === "success") {
        showSuccessMessage("update successfully!");
        // setPostContent("");
        // setPostContentCount(0);
        // setDisablePostButton(true);
        // setFile64String(null);
        // setFile64StringWithType(null);
        console.log("success");
      }

      if (response.data !== null && response.data.status === "fail") {
        // showFailMessage("Post failed. Please try again later!");
        console.log("fail");

      }
    } catch (error) {
      console.log("erroe");

      // showFailMessage("Post failed. Please try again later!");
    }
  }
  const handleDeletePost = (postId) => {
    // deletePost(postId.id)
    // const updatedPostList = postList.filter((post) => post.id !== postId);
    // // Update the postList state by removing the deleted post
    // dispatch({ type: "checkProfile/setPostList", payload: updatedPostList });
    console.log(postId, "delete");
    let idobj = {
      "id": postId.id
    }
    deletePost(idobj)
  };
  // console.log(handleDeletePost, "deleeteeeee");

  const HandleDeleteUser =()=>{
    let obj = {
      id :localStorage.getItem("psnUserId"),
    }
    axios({
      method: "delete",
      url: "/api/v1/users/delete",
      headers: {
        Authorization: localStorage.getItem("psnToken"),
      },
      data: obj
    }).then((res)=>{
      console.log(res,"res");
      showSuccessMessage("update successfully!");
      localStorage.clear()
      window.location.href = '/signin'
    }).catch((err)=>{
      console.log(err);
      showFailMessage("Post failed. Please try again later!");
    })

    // if (response.data !== null && response.data.status === "success") {
    //   showSuccessMessage("update successfully!");
      
    //   window.location.reload()
    //   console.log("success");
    //   }

    // if (response.data !== null && response.data.status === "fail") {
    //   // showFailMessage("Post failed. Please try again later!");
    //   console.log("fail");

    // }
  }
  return (

    <div>
      <ToastContainer />
      <div onClick={HandleDeleteUser}  style={{background:"red",padding:"5px",width:"200px",borderRadius:"10px",color:"#fff",textAlign:"center"}} >
        Delete My account
      </div>
      <div>
        <h1>{userInfo&& userInfo.firstName} {userInfo&&userInfo.lastName}</h1>
        <Formik
          validationSchema={schema}
          initialValues={{ bio: BioContent }}
          onSubmit={handleSubmit}
        >

          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formBio">
                {/* <Form.Label>{userInfo.firstName|| "" }  {userInfo.lastName ||""}</Form.Label> */}
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  type="text"
                  name="bio"
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.bio && !!errors.bio}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bio}
                </Form.Control.Feedback>
              </Form.Group>
              <br/>
              <Button type="submit" disabled={submitting}  >
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h1>My Posts</h1>
        {postList !== null ? (
          postList.map((postItem) => {
            return (
              <div key={postItem.id}>
                {editPostId === postItem.id ? (
                  <div>
                    {/* <Form.Control  /> */}
                    <Form.Control
                      type="text"
                      name="bio"
                      value={editedPostContent}
                      onChange={(e) => {
                        setEditedPostContent(e.target.value);
                      }}
                      as="textarea" rows={3}
                    />
                    <br />
                    <Button
                      onClick={() => {
                        handleSavePost(postItem);
                      }}
                    >
                      UPDATE
                    </Button>
                    <Button
                      onClick={() => {
                        setEditPostId(null);
                      }}
                      variant="outline-primary"
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <PostItem
                    postId={postItem.id}
                    userId={postItem.userId}
                    firstName={userInfo && userInfo.firstName ? userInfo.firstName : ""}
                    lastName={userInfo && userInfo.lastName ? userInfo.lastName : ""}
                    content={postItem.content}
                    image={postItem.image}
                    loveList={postItem.love}
                    shareList={postItem.share}
                    commentList={postItem.comment}
                    postDate={postItem.createdAt}
                    editClick={() => handleEditPost(postItem)}
                    deleteClick={() => handleDeletePost(postItem)}
                  />
                )}
                {/* <button onClick={() => handleEditPost(postItem.id)}>Edit</button>
                <button onClick={() => handleDeletePost(postItem.id)}>Delete</button> */}
              </div>
            );
          })
        )
          : (
            <span></span>
          )}
      </div>
    </div>
  );
}

export default MyProfile;
