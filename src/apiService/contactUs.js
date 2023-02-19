const MY_URL =
  "https://fj2979wjjc.execute-api.ap-south-1.amazonaws.com/bsmp/send-email";

export const contactUsService = async (data) => {
  try {
    const response = await fetch(MY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // const format = await response.json();
    console.log(response, "res");
    return response;
  } catch (error) {
    console.log(error);
    // alert(error);
  }
};
