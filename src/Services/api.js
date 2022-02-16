export const tokenObj = async () => {
  const API = 'https://opentdb.com/api_token.php?command=request';
  try {
    const data = await (await fetch(API)).json();
    return data;
  } catch (error) {
    return error;
  }
};

export const questionsObj = async (token) => {
  const API = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const data = await (await fetch(API)).json();
    return data;
  } catch (error) {
    return error;
  }
};

// 709471b0a5598650bc8105a0ec6d8b8aa33384efa247176db3dc4a431a56ea28
