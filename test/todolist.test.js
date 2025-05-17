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

    it('creates tasks', async ()=> {
        const result= await this.todolist.createTask('A new task')
        const count= await this.todolist.count()
        assert.equal(count, 2)
        console.log(result)
        const event= result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'A new task')
        assert.equal(event.completed, false)
    })

    it('toggle task completion', async ()=> {
        const result= await this.todolist.toggleCompleted(1)
        const task= await this.todolist.tasks(1)
        assert.equal(task.completed, true)
        console.log(result)
        const event= result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
    })
})