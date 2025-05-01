module.exports = async function (context, req) {
  const user = req.headers["x-ms-client-principal"];
  if (!user) {
    context.res = { status: 401, body: "No autorizado" };
    return;
  }
  const decoded = Buffer.from(user, "base64").toString("ascii");
  const userInfo = JSON.parse(decoded);
  context.res = {
    body: `Bienvenido ${userInfo.userDetails}`
  };
};