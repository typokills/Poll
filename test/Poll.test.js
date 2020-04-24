const Poll = artifacts.require('./Poll.sol') //Need to go through tutorial

contract('Poll', (accounts) => {
  before(async () => { //before each test run
    this.Poll = await Poll.deployed() //copy of the Poll deployed to the blockchain
  })

  //Checks that the Poll contract is deployed successfully
  it('deploys successfully', async () => {
    const address = await this.Poll.address //Get the address of the contract
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '') //Makes sure that the address is not empty
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('confirmedIdeaCount', async () => {
    const confirmedIdeaCount = await this.Poll.confirmedIdeaCount()
    assert.equal(confirmedIdeaCount.toNumber(), 1)
  })

  it('staffAddIdea function is working', async () => {
    const confirmedIdea = await this.Poll.staffAddIdea('New Idea')
    const confirmedIdeaCount = await this.Poll.confirmedIdeaCount()
    assert.equal(confirmedIdeaCount.toNumber(), 2)

    const event = confirmedIdea.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.details, 'New Idea')
    assert.equal(event.voteCount, 0)
  })

  it('addVerified', async () => {
    const newResident = await this.Poll.addVerified(this.address)
    const event = newResident.logs[0].args
    console.log(newResident)
    assert.equal(event.secret,this.address)

  })

  // it('toggles task completion', async () => {
  //   const result = await this.todoList.toggleCompleted(1)
  //   const task = await this.todoList.tasks(1)
  //   assert.equal(task.completed, true)
  //   const event = result.logs[0].args
  //   assert.equal(event.id.toNumber(), 1)
  //   assert.equal(event.completed, true)
  // })

})
