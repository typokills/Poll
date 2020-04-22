pragma solidity ^0.5.0;

contract Poll {

  //Model an Idea
  struct Idea {
		uint id;
		string details;
		uint voteCount;
	}

  //Store non-staff accounts that have voted
  mapping(address => bool) public voters;

  //Add or View Ideas
  mapping (uint => Idea) unconfirmedIdeas;
  mapping(uint => Idea) confirmedIdeas;

  //Staff account with admin rights
  mapping(address => bool) public staffAccount;

  //Resident accounts who were pre-registered
  mapping(address => bool) public verifiedAcc; // address of accounts to verify if they can vote

  //Store counts of the different ideas
  uint public confirmedIdeaCount;
  uint public unconfirmedIdeaCount;
  
  mapping(uint => Idea) public Ideas;

  constructor() public{
   // Add government account to the staffAccount list

  }


  function staffAddIdea(string memory _newIdea) public {
    require(staffAccount[msg.sender] == true);
    confirmedIdeaCount ++;
    confirmedIdeas[confirmedIdeaCount] = Idea(confirmedIdeaCount, _newIdea, 0);}

  function residentAddIdea(string memory _newIdea) public{
    require(verifiedAcc[msg.sender]==true);
    unconfirmedIdeaCount ++;
    unconfirmedIdeas[unconfirmedIdeaCount] = Idea(unconfirmedIdeaCount,_newIdea,0);}

  function approveIdea(uint index) private {
    require(staffAccount[msg.sender] == true);

    confirmedIdeaCount ++;
    confirmedIdeas[confirmedIdeaCount] = unconfirmedIdeas[index];

    unconfirmedIdeaCount --;
    delete unconfirmedIdeas[index];
  }
}
