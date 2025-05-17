const todolist= artifacts.require('./todolist.sol')

contract('todolist', (accounts) => {
    before(async ()=> {
        this.todolist= await todolist.deployed()
    })

    it('deploys successfully', async ()=> {
        const address= await this.todolist.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists tasks', async ()=> {
        const count= await this.todolist.count()
        const task= await this.todolist.tasks(count)
        assert.equal(task.id.toNumber(), count.toNumber())
        assert.equal(task.content, 'hello world')
        assert.equal(task.completed, false)
        assert.equal(count.toNumber(), 1)
    })
})