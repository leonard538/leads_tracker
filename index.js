let leadsGrp = {
    default: []
}
let activeGroup = "default"  // Track the currently active group

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const leadsGrpFromLocalStorage = JSON.parse( localStorage.getItem("leadsGrp") )
const tabBtn = document.getElementById("tab-btn")
const addGrpBtn = document.getElementById("add-group") 
const inputGrp = document.getElementById("input-grp")
const leadsContainer = document.getElementById("leads-group-container")
const leadList = document.getElementById("list")
const removeGroupBtn = document.getElementById("remove-group-btn")

if (leadsGrpFromLocalStorage) {
    leadsGrp = leadsGrpFromLocalStorage
}

// Always render groups (whether from localStorage or default)
renderGroup()
groupLeadList("default")

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        leadsGrp[activeGroup].push(tabs[0].url)
        localStorage.setItem("leadsGrp", JSON.stringify(leadsGrp) )
        groupLeadList(activeGroup)
    })
})


function renderGroup() {
    const grpKeys = Object.keys(leadsGrp)
    // Clear existing group elements (except the add button and input)
    const existingGroups = leadsContainer.querySelectorAll(".leads-group")
    existingGroups.forEach(group => group.remove())

    Object.keys(leadsGrp).forEach(key => {
        const btn = document.createElement("button")
        btn.className = "leads-group"
        btn.id = key
        btn.textContent = key

        // Set active class on the currently active group
        if (key === activeGroup) {
            btn.classList.add("active-btn")
        }

        if (key !== "default") {
            const removeBtn = document.createElement("button")
            removeBtn.className = "remove-group-btn"
            removeBtn.dataset.group = key
            removeBtn.title = "delete this group"
            removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
            
            // Only show if this is the active group
            if (key === activeGroup) {
                removeBtn.style.display = "inline-block"
            } else {
                removeBtn.style.display = "none"
            }
            
            btn.appendChild(removeBtn)
        }

        btn.addEventListener("click", () => {
            // Remove active class from all buttons and hide all remove buttons
            leadsContainer.querySelectorAll(".leads-group").forEach(b => {
                b.classList.remove("active-btn")
                const rmBtn = b.querySelector(".remove-group-btn")
                if (rmBtn) rmBtn.style.display = "none"
            })
            
            // Add active class and show remove button for clicked group
            btn.classList.add("active-btn")
            const rmBtn = btn.querySelector(".remove-group-btn")
            if (rmBtn) rmBtn.style.display = "inline-block"
            
            activeGroup = key
            groupLeadList(key)
        })
       
        leadsContainer.appendChild(btn)
    })
}

function groupLeadList(id) {
    const leads = leadsGrp[id]
    let listItem = ""

    // Clear previous list
    leadList.innerHTML = ""

    leads.forEach((item, index) => {
        listItem += `<li class="link-list">
            <a target='_blank' href='${item}'>${item}</a> 
            <span class="remove-link-btn" data-group="${id}" data-index="${index}" title="delete this link">
                <i class="fa-solid fa-xmark"></i>
            </span>
        </li>`
    })
    
    const ul = document.createElement("ul")
    //ul.classList.add("ul-el")
    ul.innerHTML = listItem
    leadList.appendChild(ul)
}

leadsContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-group-btn")

    // remove group
    if(removeBtn) {
        e.stopPropagation()

        const group = removeBtn.dataset.group

        if (group === "default") return // incase

        if (!confirm(`Delete group "${group}"?`)) return

        delete leadsGrp[group]
        localStorage.setItem("leadsGrp", JSON.stringify(leadsGrp))

        // If the deleted group was active, switch to default
        if (activeGroup === group) {
            activeGroup = "default"
            groupLeadList("default")
        }

        renderGroup()
        return
    }
})

leadList.addEventListener("click", (e) => { // removes link
    const remListBtn = e.target.closest(".remove-link-btn")
    if(!remListBtn) return

    const group = remListBtn.dataset.group
    const index = remListBtn.dataset.index

    leadsGrp[group].splice(index, 1)

    localStorage.setItem("leadsGrp", JSON.stringify(leadsGrp))
    groupLeadList(group)
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    leadsGrp = {
        default: []
    }
    activeGroup = "default"
    renderGroup()
    groupLeadList(activeGroup)
})

inputBtn.addEventListener("click", function() {
    leadsGrp[activeGroup].push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("leadsGrp", JSON.stringify(leadsGrp) )
    groupLeadList(activeGroup)
})

addGrpBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent document click
    inputGrp.style.display = "flex"
    //inputGrp.focus()
})

inputGrp.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && inputGrp.value.trim() !== "") {
        addNewGroup()
    }
})

document.addEventListener("click", (e) => {
    if (e.target !== inputGrp && e.target !== addGrpBtn) {
        if (inputGrp.value.trim() !== "") {
            addNewGroup()
        } else {
            inputGrp.style.display = "none"
        }
    }
})

function addNewGroup() {
    const groupName = inputGrp.value.trim()
    if (groupName && !leadsGrp.hasOwnProperty(groupName)) {
        leadsGrp[groupName] = []
        localStorage.setItem("leadsGrp", JSON.stringify(leadsGrp))
        renderGroup()
    }
    inputGrp.value = ""
    inputGrp.style.display = "none"
}