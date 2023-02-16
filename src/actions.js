import url from "./url";
import { redirect } from "react-router-dom";

//createAction => create a todo from form submissions to `/create`
export async function CreateAction({ request }) {
  // get the form data
  const formData = await request.formData();

  // construct new todo
  const newTodo = {
    subject: formData.get("subject"),
    details: formData.get("details"),
  };

  // request to create route in backend
  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  // redirect back to the index page
  return redirect("/");
}

//updateAction => update a todo from form submissions to `/update/:id`
export async function UpdateAction({ request, params }) {
    // get the form data
    const formData = await request.formData();
  
    // construct request body
    const updateTodo = {
      subject: formData.get("subject"),
      details: formData.get("details"),
    };
  
    // send request to backend
    await fetch(url + params.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTodo),
    });
  
    // redirect back to the index page
    return redirect("/");
  }

//deleteAction => delete a todo from form submissions to `/delete/:id`
export async function DeleteAction({ params }) {
    // send request to backend
    await fetch(url + params.id + "/", {
      method: "delete",
    })
    // redirect back to the index page
    return redirect("/");
  }