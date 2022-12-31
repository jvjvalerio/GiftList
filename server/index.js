const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ddd59a2ff8am3ue3ff47993312821cd58a35a02f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { proof, leaf }= req.body;

  // TODO: prove that a name is in the list 
  const calculatedRoot = verifyProof(proof, leaf, MERKLE_ROOT);
  console.log("proof:", proof);
  console.log("leaf:", leaf);
  console.log("MERKLE_ROOT:", MERKLE_ROOT);
  console.log("calculatedRoot:", calculatedRoot);
  const isInTheList = calculatedRoot === MERKLE_ROOT;
  console.log("isInTheList:", isInTheList);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
