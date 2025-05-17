App = {
    loading: false,
    contracts: {},

    load: async () => {
        // Load app...
        console.log("app laoding...")
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.redner()
    },

    loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
        } else {
        window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
        } catch (error) {
            // User denied account access...
        }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },
    loadAccount: async () => {
        App.account= web3.eth.accounts[0]
        console.log(App.account)
    },
    loadContract: async () => {
        const todolist= await $.getJSON('todolist.json')
        App.contracts.todolist = TruffleContract(todolist)
        App.contracts.todolist.setProvider(App.web3Provider)
        console.log(todolist)

        App.todolist= await App.contracts.todolist.deployed()
    },
    redner: async () => {
        // prevent double render
        if (App.loading) {
            return
        }
        // update app loading state
        App.setLoading(true)

        // render account
        $('#account').html(App.account)

        // Render tasks
        await App.renderTasks()

        // update app loading state
        App.setLoading(false)
    },
    setLoading: (boolean) => {
        App.loading= boolean
        const loader= $('#loader')
        const content= $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    },
    renderTasks: async () => {
        // Load the total task count from the blockchain
        const count= await App.todolist.count()
        const $taskTemplate= $('.taskTemplate')

        // Render out each task with a new task template
        for (var i= 1; i <= count; i++) {
            // Fetch the task data from the blockchain
            const task= await App.todolist.tasks(i) // return an array
            const taskId= task[0].toNumber()
            const taskContent= task[1]
            const taskCompleted= task[2]

            // Create the html for the desk
            const $newTaskTemplate= $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                            .prop('name', taskId)
                            .prop('checked', taskCompleted)
                            .on('click', App.toggleCompleted)

            // Put the task in the correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }

            // Show the task
            $newTaskTemplate.show()
        }

        
    }
}

$(() =>{
    $(window).load(() => {
        App.load()
    })
})