const tokenObj = async () => {
  const API = 'https://opentdb.com/api_token.php?command=request';
  try {
    const data = await (await fetch(API)).json();
    return data;
  } catch (error) {
    return error;
  }
};

export default tokenObj;
