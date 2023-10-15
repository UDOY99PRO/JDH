async function ask_gpt(msg) {
var data = {
  "data": {
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": msg}
    ],
    "temperature": 0.3,
    "max_tokens": 1000,
    "top_p": 0.3,
    "frequency_penalty": 0.5,
    "presence_penalty": 0.2
  }
};

var completion = await fetch(gptAPI, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(res => res.json());
     // console.log(completion)
  return await completion.message.choices[0].message.content;
}

//ask_gpt();
      module.exports = ask_gpt