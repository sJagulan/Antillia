
console.log("Heyo")

function generate(){
    const doc = fetch('http://localhost:3000/report');
    console.log("Document has been sent");
    console.log(doc);
}

async function saveData(){
    let data = await getData()
    localStorage.setItem("userData", JSON.stringify(data))
}

function fillData(){
    let storedData = localStorage.getItem("userData")
    if(storedData){
        let parsedData = JSON.parse(storedData)
        console.log(parsedData)

        document.getElementById('job_address').value = parsedData.job_address
        document.getElementById('account').value = parsedData.account
        fillCheckboxes(parsedData.job_category, 'job_category', document)
        document.getElementById('start_time').value = parsedData.start_time
        document.getElementById('num_resources').value = parsedData.num_resources
        document.getElementById('date_damage').value = parsedData.date_damage
        document.getElementById('cause_dmg').value = parsedData.cause_dmg
        document.getElementById('attendence_num').value = parsedData.attendence_num
        document.getElementById('client_discussion').value = parsedData.client_discussion
        document.getElementById('water_damage_class').value = parsedData.water_damage_class
        document.getElementById('water_damage_category').value = parsedData.water_damage_category
        document.getElementById('outdoor_temperature').value = parsedData.outdoor_temperature
        document.getElementById('outdoor_dew_point').value = parsedData.outdoor_dew_point
        document.getElementById('outdoor_relative_humidity').value = parsedData.outdoor_relative_humidity
        document.getElementById('outdoor_gpk').value = parsedData.outdoor_gpk
        document.getElementById('next_steps').value = parsedData.next_steps
        document.getElementById('other_trades').value = parsedData.other_trades
        document.getElementById('matters_for_consideration').value = parsedData.matters_for_consideration
        document.getElementById('accomodation').value = parsedData.accomodation
        document.getElementById('estimated_equipment_pickup').value = parsedData.estimated_equipment_pickup
        document.getElementById('end_time').value = parsedData.end_time

        let roomsDiv = document.getElementById('rooms')
        roomsDiv.innerHTML = ""
        for(let i = 0; i < parsedData.rooms.length; i++){
            generateRoom()
            let divs = roomsDiv.getElementsByTagName('div')
            divs[i].querySelector('.room_name').value = parsedData.rooms[i].room_name
            divs[i].querySelector('.temperature').value = parsedData.rooms[i].temperature
            divs[i].querySelector('.dew_point').value = parsedData.rooms[i].dew_point
            divs[i].querySelector('.relative_humidity').value = parsedData.rooms[i].relative_humidity
            divs[i].querySelector('.gpk').value = parsedData.rooms[i].gpk
            divs[i].querySelector('.width').value = parsedData.rooms[i].width
            divs[i].querySelector('.length').value = parsedData.rooms[i].length
            divs[i].querySelector('.height').value = parsedData.rooms[i].height
            divs[i].querySelector('.room_dmg_percent').value = parsedData.rooms[i].room_dmg_percent
            fillCheckboxes(parsedData.rooms[i].flooring_type, 'flooring_type', divs[i])
            fillCheckboxes(parsedData.rooms[i].carpet_type, 'carpet_type', divs[i])
            fillCheckboxes(parsedData.rooms[i].underlay_colour, 'underlay_colour', divs[i])
            divs[i].querySelector('.is_floor_restorable').value = parsedData.rooms[i].is_floor_restorable
            divs[i].querySelector('.quantity_removed_floor').value = parsedData.rooms[i].quantity_removed_floor
            fillCheckboxes(parsedData.rooms[i].findings, 'findings', divs[i])
            divs[i].querySelector('.supporting_findings').value = parsedData.rooms[i].supporting_findings
            fillCheckboxes(parsedData.rooms[i].actions, 'actions', divs[i])
            divs[i].querySelector('.supporting_actions').value = parsedData.rooms[i].supporting_actions
            fillCheckboxesAndText(parsedData.rooms[i].equipment, 'equipment', divs[i])
            const photosDiv = divs[i].querySelector('.selectedPhotos');
            parsedData.rooms[i].photos.forEach((base64Data, index) => {
                const photoElement = document.createElement('div');

                // Display the image name
                const fileNameElement = document.createElement('div');
                fileNameElement.textContent = `photo${index}`;  // Add the actual file name if available
                photoElement.appendChild(fileNameElement);

                const img = document.createElement('img');
                img.src = base64Data;
                photoElement.appendChild(img);

                // Add a delete button for each photo
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    // Handle delete functionality here
                    // For now, let's just remove the image from the DOM
                    photoElement.remove();
                });
                photoElement.appendChild(deleteButton);

                photosDiv.appendChild(photoElement);
            });
        }
    }
    else{
        console.log("No cached data")
    }
    
}

window.onload = fillData()

async function getData(){
    let data = {
        "job_address": document.getElementById('job_address').value,
        "account": document.getElementById('account').value,
        "job_category": getCheckboxes('job_category', document),
        "start_time": document.getElementById('start_time').value,
        "num_resources": document.getElementById('num_resources').value,
        "date_damage": document.getElementById('date_damage').value,
        "cause_dmg": document.getElementById('cause_dmg').value,
        "attendence_num": document.getElementById('attendence_num').value,
        "client_discussion": document.getElementById('client_discussion').value,
        "water_damage_class": document.getElementById('water_damage_class').value,
        "water_damage_category": document.getElementById('water_damage_category').value,
        "outdoor_temperature": document.getElementById('outdoor_temperature').value,
        "outdoor_dew_point": document.getElementById('outdoor_dew_point').value,
        "outdoor_relative_humidity": document.getElementById('outdoor_relative_humidity').value,
        "outdoor_gpk": document.getElementById('outdoor_gpk').value,
        "rooms": await getDataRooms(),
        "next_steps": document.getElementById('next_steps').value,
        "other_trades": document.getElementById('other_trades').value,
        "matters_for_consideration": document.getElementById('matters_for_consideration').value,
        "accomodation": document.getElementById('accomodation').value,
        "estimated_equipment_pickup": document.getElementById('estimated_equipment_pickup').value,
        "end_time": document.getElementById('end_time').value,
    }
    console.log(data)
    return data
}

async function getDataRooms(){
    let roomElements = Array.from(document.getElementById("rooms").children)
    return Promise.all(roomElements.map(async (roomElement) => {
        let room = {
            "room_name": roomElement.querySelector('.room_name').value,
            "temperature": roomElement.querySelector('.temperature').value,
            "dew_point": roomElement.querySelector('.dew_point').value,
            "relative_humidity": roomElement.querySelector('.relative_humidity').value,
            "gpk": roomElement.querySelector('.gpk').value,
            "width": roomElement.querySelector('.width').value,
            "length": roomElement.querySelector('.length').value,
            "height": roomElement.querySelector('.height').value,
            "room_dmg_percent": roomElement.querySelector('.room_dmg_percent').value,
            "flooring_type": getCheckboxes('flooring_type', roomElement),
            "carpet_type": getCheckboxes('carpet_type', roomElement),
            "underlay_colour": getCheckboxes('underlay_colour', roomElement),
            "is_floor_restorable": roomElement.querySelector('.is_floor_restorable').value,
            "quantity_removed_floor": roomElement.querySelector('.quantity_removed_floor').value,
            "findings": getCheckboxes('findings', roomElement),
            "supporting_findings": roomElement.querySelector('.supporting_findings').value,
            "actions": getCheckboxes('actions', roomElement),
            "supporting_actions": roomElement.querySelector('.supporting_actions').value,
            "equipment": getCheckboxesAndText('equipment', roomElement),
            "photos": await processPhotos(roomElement.querySelector('.photoroom')),
        }
        return room
    }))
}

function generateRoom(){
    let div = document.createElement('div')
    div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()">Delete Room</button>
    <br>
    <br>
    <div>
        <label for="room_name">Room Name</label>
        <input type="text" class="room_name">
    </div>

    <div>
        <label for="temperature">Temperature</label>
        <input type="number" class="temperature" min="1">
    </div>

    <div>
        <label for="dew_point">Dew Point</label>
        <input type="number" class="dew_point" min="1">
    </div>

    <div>
        <label for="relative_humidity">Relative Humidity</label>
        <input type="number" class="relative_humidity" min="1">
    </div>

    <div>
        <label for="gpk">GPK</label>
        <input type="number" class="gpk" min="1">
    </div>

    <div>
        <label for="width">Width</label>
        <input type="number" class="width" min="1">
    </div>

    <div>
        <label for="length">Length</label>
        <input type="number" class="length" min="1">
    </div>

    <div>
        <label for="height">Height</label>
        <input type="number" class="height" min="1">
    </div>

    <div>
        <label for="room_dmg_percent">Room Damage %</label>
        <input type="text" class="room_dmg_percent">
    </div>

    <div class="checkbox-group">
        <label for="flooring_type">Flooring Type</label>
        <button class="dropdown-button" onclick=triggerDropdown(this)>Hide</button>
        <br>
        <div class="collapsable-content">
            <label for="Carpet">Carpet</label>
            <input type="checkbox" class="flooring_type" value="Carpet">

            <label for="Carpet Tiles">Carpet Tiles</label>
            <input type="checkbox" class="flooring_type" value="Carpet Tiles">

            <label for="Tiles">Tiles</label>
            <input type="checkbox" class="flooring_type" value="Tiles">

            <label for="Floating boards">Floating boards</label>
            <input type="checkbox" class="flooring_type" value="Floating boards">

            <label for="Laminated">Laminated</label>
            <input type="checkbox" class="flooring_type" value="Laminated">

            <label for="Vinyl">Vinyl</label>
            <input type="checkbox" class="flooring_type" value="Vinyl">

            <label for="Direct Stick Vinyl">Direct Stick Vinyl</label>
            <input type="checkbox" class="flooring_type" value="Direct Stick Vinyl">

            <label for="Engineered">Engineered</label>
            <input type="checkbox" class="flooring_type" value="Engineered">

            <label for="Hardwood">Hardwood</label>
            <input type="checkbox" class="flooring_type" value="Hardwood">

            <label for="Parquetry">Parquetry</label>
            <input type="checkbox" class="flooring_type" value="Parquetry">

            <label for="Direct Stick Timber">Direct Stick Timber</label>
            <input type="checkbox" class="flooring_type" value="Direct Stick Timber">

            <label for="Concrete">Concrete</label>
            <input type="checkbox" class="flooring_type" value="Concrete">

            <label for="Soil">Soil</label>
            <input type="checkbox" class="flooring_type" value="Soil">

            <label for="Other - See Findings">Other - See Findings</label>
            <input type="checkbox" class="flooring_type" value="Other - See Findings">
        </div>
    </div>

    <div class="checkbox-group">
        <label for="carpet_type">If Carpet, Carpet Type</label>
        <button class="dropdown-button" onclick=triggerDropdown(this)>Hide</button>
        <br>
        <div class="collapsable-content">
            <label for="Wool">Wool</label>
            <input type="checkbox" class="carpet_type" value="Wool">

            <label for="Nylon">Nylon</label>
            <input type="checkbox" class="carpet_type" value="Nylon">

            <label for="Polypropylene">Polypropylene</label>
            <input type="checkbox" class="carpet_type" value="Polypropylene">

            <label for="Polyester">Polyester</label>
            <input type="checkbox" class="carpet_type" value="Polyester">

            <label for="Olefin">Olefin</label>
            <input type="checkbox" class="carpet_type" value="Olefin">

            <label for="Acrylic">Acrylic</label>
            <input type="checkbox" class="carpet_type" value="Acrylic">

            <label for="Carpet Tiles">Carpet Tiles</label>
            <input type="checkbox" class="carpet_type" value="Carpet Tiles">

            <label for="Axminister">Axminister</label>
            <input type="checkbox" class="carpet_type" value="Axminister">

            <label for="Other - Refer to findings">Other - Refer to findings</label>
            <input type="checkbox" class="carpet_type" value="Other - Refer to findings">
        </div>
    </div>

    <div class="checkbox-group">
        <label for="underlay_colour">Colour of Underlay</label>
        <button class="dropdown-button" onclick=triggerDropdown(this)>Hide</button>
        <br>
        <div class="collapsable-content">
            <label for="Carpet not lifted - underlay not seen">Carpet not lifted - underlay not seen</label>
            <input type="checkbox" class="underlay_colour" value="Carpet not lifted - underlay not seen">

            <label for="Rubber - Fire rated">Rubber - Fire rated</label>
            <input type="checkbox" class="underlay_colour" value="Rubber - Fire rated">

            <label for="Rubber - Not Fire Rated">Rubber - Not Fire Rated</label>
            <input type="checkbox" class="underlay_colour" value="Rubber - Not Fire Rated">

            <label for="Foam">Foam</label>
            <input type="checkbox" class="underlay_colour" value="Foam">

            <label for="Felt">Felt</label>
            <input type="checkbox" class="underlay_colour" value="Felt">

            <label for="No underlay">No underlay</label>
            <input type="checkbox" class="underlay_colour" value="No underlay">

            <label for="Other">Other:</label>
            <input type="checkbox" class="underlay_colour" value="Other">
        </div>
    </div>
    
    <div>
        <label for="is_floor_restorable">Is Flooring Restorable</label>
        <select id="is_floor_restorable">
            <option value="Not Applicable">Not Applicable</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
        </select>
    </div>

    <div>
        <label for="quantity_removed_floor">Quantity of Flooring Removed (meters squared)</label>
        <input type="text" class="quantity_removed_floor">
    </div>

    <div class="checkbox-group">
        <label for="findings">Findings</label>
        <button class="dropdown-button" onclick=triggerDropdown(this)>Hide</button>
        <br>
        <div class="collapsable-content">
            <label for="Elevated humidity detected in the air">Elevated humidity detected in the air</label>
            <input type="checkbox" class="findings" value="Elevated humidity detected in the air">

            <label for="Elevated moisture detected on flooring">Elevated moisture detected on flooring</label>
            <input type="checkbox" class="findings" value="Elevated moisture detected on flooring">

            <label for="Elevated moisture detected on sub-floor">Elevated moisture detected on sub-floor</label>
            <input type="checkbox" class="findings" value="Elevated moisture detected on sub-floor">

            <label for="Elevated moisture detected on skirting">Elevated moisture detected on skirting</label>
            <input type="checkbox" class="findings" value="Elevated moisture detected on skirting">

            <label for="Elevated moisture detected on plaster walls">Elevated moisture detected on plaster walls</label>
            <input type="checkbox" class="findings" value="Elevated moisture detected on plaster walls">

            <label for="Elevated moisture detected on ceiling">Elevated moisture detected on ceiling</label>
            <input type="checkbox" class="findings" value="Elevated moisture detected on ceiling">

            <label for="Water staining evident on flooring">Water staining evident on flooring</label>
            <input type="checkbox" class="findings" value="Water staining evident on flooring">

            <label for="Sewerage overflow affected flooring">Sewerage overflow affected flooring</label>
            <input type="checkbox" class="findings" value="Sewerage overflow affected flooring">

            <label for="Flooring has cupped/crowned">Flooring has cupped/crowned</label>
            <input type="checkbox" class="findings" value="Flooring has cupped/crowned">

            <label for="Skirting boards have swelled">Skirting boards have swelled</label>
            <input type="checkbox" class="findings" value="Skirting boards have swelled">

            <label for="Visible mould detected">Visible mould detected</label>
            <input type="checkbox" class="findings" value="Visible mould detected">

            <label for="Visible water staining on the ceiling">Visible water staining on the ceiling</label>
            <input type="checkbox" class="findings" value="Visible water staining on the ceiling">

            <label for="Visible water staining on the walls">Visible water staining on the walls</label>
            <input type="checkbox" class="findings" value="Visible water staining on the walls">

            <label for="Elevated moisture detected under the house/building">Elevated moisture detected under the house/building</label>
            <input type="checkbox" class="findings" value="Elevated moisture detected under the house/building">

            <label for="Water detected under the house/building">Water detected under the house/building</label>
            <input type="checkbox" class="findings" value="Water detected under the house/building">

            <label for="Sewerage overflow affected outdoor areas">Sewerage overflow affected outdoor areas</label>
            <input type="checkbox" class="findings" value="Sewerage overflow affected outdoor areas">

            <label for="Additional building damages observed">Additional building damages observed</label>
            <input type="checkbox" class="findings" value="Additional building damages observed">

            <label for="Contents are affected">Contents are affected</label>
            <input type="checkbox" class="findings" value="Contents are affected">

            <label for="Flooring returned dry readings">Flooring returned dry readings</label>
            <input type="checkbox" class="findings" value="Flooring returned dry readings">

            <label for="Sub-floor returned dry readings">Sub-floor returned dry readings</label>
            <input type="checkbox" class="findings" value="Sub-floor returned dry readings">

            <label for="Plaster walls returned dry readings">Plaster walls returned dry readings</label>
            <input type="checkbox" class="findings" value="Plaster walls returned dry readings">

            <label for="Skirting boards returned dry readings">Skirting boards returned dry readings</label>
            <input type="checkbox" class="findings" value="Skirting boards returned dry readings">

            <label for="Ceiling returned dry readings">Ceiling returned dry readings</label>
            <input type="checkbox" class="findings" value="Ceiling returned dry readings">

            <label for="All moisture readings are within acceptable parameters">All moisture readings are within acceptable parameters</label>
            <input type="checkbox" class="findings" value="All moisture readings are within acceptable parameters">

            <label for="No damages found">No damages found</label>
            <input type="checkbox" class="findings" value="No damages found">

            <label for="All work completed on a previous attendance">All work completed on a previous attendance</label>
            <input type="checkbox" class="findings" value="All work completed on a previous attendance">

            <label for="No assessment required on this attendance">No assessment required on this attendance</label>
            <input type="checkbox" class="findings" value="No assessment required on this attendance">
        </div>
    </div>

    <div>
        <label for="supporting_findings">Supporting Findings</label>
        <textarea type="text" class="supporting_findings"></textarea>
    </div>

    <div class="checkbox-group">
        <label for="actions">Actions</label>
        <button class="dropdown-button" onclick=triggerDropdown(this)>Hide</button>
        <br>
        <div class="collapsable-content">
            <label for="Completed assessment">Completed assessment</label>
            <input type="checkbox" class="actions" value="Completed assessment">

            <label for="Undertook moisture readings">Undertook moisture readings</label>
            <input type="checkbox" class="actions" value="Undertook moisture readings">

            <label for="Obtained thermal images">Obtained thermal images</label>
            <input type="checkbox" class="actions" value="Obtained thermal images">

            <label for="Moved furniture/contents">Moved furniture/contents</label>
            <input type="checkbox" class="actions" value="Moved furniture/contents">

            <label for="Extracted water">Extracted water</label>
            <input type="checkbox" class="actions" value="Extracted water">

            <label for="Installed equipment">Installed equipment</label>
            <input type="checkbox" class="actions" value="Installed equipment">

            <label for="Removed and disposed of non-salvageable carpet">Removed and disposed of non-salvageable carpet</label>
            <input type="checkbox" class="actions" value="Removed and disposed of non-salvageable carpet">

            <label for="Removed and disposed of non-salvageable underlay">Removed and disposed of non-salvageable underlay</label>
            <input type="checkbox" class="actions" value="Removed and disposed of non-salvageable underlay">

            <label for="Removed and disposed of non-salvageable flooring">Removed and disposed of non-salvageable flooring</label>
            <input type="checkbox" class="actions" value="Removed and disposed of non-salvageable flooring">

            <label for="Removed and disposed of smooth edge">Removed and disposed of smooth edge</label>
            <input type="checkbox" class="actions" value="Removed and disposed of smooth edge">

            <label for="Cut, removed and disposed of affected plaster">Cut, removed and disposed of affected plaster</label>
            <input type="checkbox" class="actions" value="Cut, removed and disposed of affected plaster">

            <label for="Drilled holes in kickers">Drilled holes in kickers</label>
            <input type="checkbox" class="actions" value="Drilled holes in kickers">

            <label for="Removed and disposed of non-salvageable skirting boards">Removed and disposed of non-salvageable skirting boards</label>
            <input type="checkbox" class="actions" value="Removed and disposed of non-salvageable skirting boards">

            <label for="Cleaned sewage affected areas and treated with anti-microbial">Cleaned sewage affected areas and treated with anti-microbial</label>
            <input type="checkbox" class="actions" value="Cleaned sewage affected areas and treated with anti-microbial">

            <label for="Set up containment(s)">Set up containment(s)</label>
            <input type="checkbox" class="actions" value="Set up containment(s)">

            <label for="Contained visible mould">Contained visible mould</label>
            <input type="checkbox" class="actions" value="Contained visible mould">

            <label for="PRV clean completed">PRV clean completed</label>
            <input type="checkbox" class="actions" value="PRV clean completed">

            <label for="Conducted Inventory">Conducted Inventory</label>
            <input type="checkbox" class="actions" value="Conducted Inventory">

            <label for="Disposed of non-salvageable contents">Disposed of non-salvageable contents</label>
            <input type="checkbox" class="actions" value="Disposed of non-salvageable contents">

            <label for="Prepared Scope of Works">Prepared Scope of Works</label>
            <input type="checkbox" class="actions" value="Prepared Scope of Works">

            <label for="Prepared variation of Scope of Works">Prepared variation of Scope of Works</label>
            <input type="checkbox" class="actions" value="Prepared variation of Scope of Works">

            <label for="No further work required">No further work required</label>
            <input type="checkbox" class="actions" value="No further work required">
        </div>
    </div>
    
    <div>
        <label for="supporting_actions">Supporting Actions</label>
        <textarea type="text" class="supporting_actions"></textarea>
    </div>

    <div class="checkbox-group">
        <label for="equipment">Equipment</label>
        <button class="dropdown-button" onclick=triggerDropdown(this)>Hide</button>
        <br>
        <div class="collapsable-content">
            <label for="AFD's">AFD's</label>
            <input type="checkbox" class="equipment" value="AFD's" onchange="toggleInput(this)">
            <div class="AFD's-input" style="display: none;">
                <label for="AFD's-quantity">Quantity:</label>
                <input type="number" class="AFD's-quantity" min="1">
            </div>

            <label for="Dehumidifiers">Dehumidifiers</label>
            <input type="checkbox" class="equipment" value="Dehumidifiers" onchange="toggleInput(this)">
            <div class="Dehumidifiers-input" style="display: none;">
                <label for="Dehumidifiers-quantity">Quantity:</label>
                <input type="number" class="Dehumidifiers-quantity" min="1">
            </div>

            <label for="Air Mover">Air Mover</label>
            <input type="checkbox" class="equipment" value="Air Mover" onchange="toggleInput(this)">
            <div class="Air Mover-input" style="display: none;">
                <label for="Air Mover-quantity">Quantity:</label>
                <input type="number" class="Air Mover-quantity" min="1">
            </div>

            <label for="Axial Drier">Axial Drier</label>
            <input type="checkbox" class="equipment" value="Axial Drier" onchange="toggleInput(this)">
            <div class="Axial Drier-input" style="display: none;">
                <label for="Axial Drier-quantity">Quantity:</label>
                <input type="number" class="Axial Drier-quantity" min="1">
            </div>

            <label for="Drying Matt">Drying Matt</label>
            <input type="checkbox" class="equipment" value="Drying Matt" onchange="toggleInput(this)">
            <div class="Drying Matt-input" style="display: none;">
                <label for="Drying Matt-quantity">Quantity:</label>
                <input type="number" class="Drying Matt-quantity" min="1">
            </div>
        </div>
    </div>

    <div class="photoroom">
        <label for="photos">Photos</label>
        <input type="file" accept="image/jpg, image/jpeg" class="photos" multiple>
        <div class="selectedPhotos"></div>
    </div>
    `
    document.getElementById('rooms').appendChild(div)
    setupFileInputs()
    
}

function getCheckboxes(checkbox_parent, doc){
    let checkedVals = []
    let inputElements = doc.getElementsByClassName(checkbox_parent)
    for(let i=0; i < inputElements.length; i++){
        if(inputElements[i].checked){
            checkedVals.push(inputElements[i].value)
        }
    }
    return checkedVals
}

function getCheckboxesAndText(checkbox_parent, doc){
    let checkedVals = []
    let inputElements = doc.getElementsByClassName(checkbox_parent)
    for(let i=0; i < inputElements.length; i++){
        if(inputElements[i].checked){
            const inputField = doc.getElementsByClassName(`${inputElements[i].value}-quantity`)[0]
            checkedVals.push([inputElements[i].value, inputField.value])
        }
    }
    return checkedVals
}

function fillCheckboxes(items, checkbox_parent, doc){
    let inputElements = doc.getElementsByClassName(checkbox_parent)
    for(let i=0; i < items.length; i++){
        for(let j=0; j < inputElements.length; j++){
            if(items[i] === inputElements[j].value){
                inputElements[j].checked = true
                break
            }
        }
    }
}

function fillCheckboxesAndText(items, checkbox_parent, doc) {
    let inputElements = doc.getElementsByClassName(checkbox_parent);
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < inputElements.length; j++) {
            if (items[i][0] === inputElements[j].value) {
                inputElements[j].checked = true;

                // Correctly construct the class name for the quantity element
                const quantityClassName = `${items[i][0]}-quantity`;

                // Access the quantity element by class name
                const quantityElement = doc.getElementsByClassName(quantityClassName)[0];

                // Set the value of the quantity element
                quantityElement.value = items[i][1];

                // Correctly construct the class name for the input element
                const inputClassName = `${items[i][0]}-input`;

                // Access the input element by class name
                const inputElement = doc.getElementsByClassName(inputClassName)[0];

                // Show the input element
                inputElement.style.display = 'block';

                break;
            }
        }
    }
}


async function processPhotos(photosDiv) {
    return new Promise((resolve, reject) => {
        const existingImages = photosDiv.querySelectorAll('.selectedPhotos img');
        const base64Array = [];
        let processedCount = 0;

        if (existingImages.length === 0) {
            // If no images, resolve with an empty array
            resolve(base64Array);
        }

        existingImages.forEach((imgElement, index) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Create a new Image object to load the image
            const img = new Image();

            // Set up an event listener to handle image load
            img.onload = function () {
                // Set canvas dimensions to the image dimensions
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the image onto the canvas
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Get the base64-encoded data URL
                const base64Data = canvas.toDataURL('image/jpeg');
                base64Array.push(base64Data);

                // Check if this is the last image
                processedCount++;
                if (processedCount === existingImages.length) {
                    resolve(base64Array);
                }
            };

            // Set up an event listener to handle image load errors
            img.onerror = function () {
                reject(new Error('Error loading image.'));
            };

            // Set the src attribute to start loading the image
            img.src = imgElement.src;
        });
    });
}


function processEmail() {
    const messageContainer = document.createElement('div');
    messageContainer.textContent = "Sending email please wait"
    document.getElementById('form').appendChild(messageContainer);

    getData().then((data) => {
        // Create an array of Promises for generating zip files
        let zipPromises = data.rooms.map((room) => {
            const zip = new JSZip();

            // Add images to the zip file
            room.photos.forEach((imageData, j) => {
                zip.file(`image${j + 1}.jpg`, imageData.split(",")[1], { base64: true });
            });

            // Generate the zip content and push the promise to the array
            return zip.generateAsync({ type: "base64" });
        });

        // Wait for all zip files to be generated
        Promise.all(zipPromises)
            .then(zipContents => {
                // Attachments array for Email.send
                let attachments = zipContents.map((zipBase64, i) => {
                    return {
                        name: `${data.rooms[i].room_name}.zip`, // Assuming you want the zip file named after the room_name
                        data: zipBase64,
                        encoding: "base64"
                    };
                });

                
                // Send the email with SMTP.js
                Email.send({
                    SecureToken: "6bf2cac1-8cf6-4800-ba16-7ab9fece4418",
                    To: 'admin@antilliaemergencynetwork.com.au',
                    //To: 'therealadazartar@gmail.com',
                    From: "adamautomated39@gmail.com",
                    Subject: `${data.job_address}`,
                    Body: `
Job Address: ${data.job_address}<br>
Account: ${data.account}<br>
Job Category: ${data.job_category}<br>
Start Time: ${data.start_time}<br>
Number of Resources: ${data.num_resources}<br>
Date Damage Occurred: ${data.date_damage}<br>
Cause of Damage: ${data.cause_dmg}<br>
Attendence Number: ${data.attendence_num}<br>
Client Discussion: ${data.client_discussion}<br>
Water Damage Class: ${data.water_damage_class}<br>
Water Damage Category: ${data.water_damage_category}<br>
Outdoor Temperature: ${data.outdoor_temperature}<br>
Outdoor Dew Point: ${data.outdoor_dew_point}<br>
Outdoor Relative Humidity: ${data.outdoor_relative_humidity}<br>
Outdoor GPK: ${data.outdoor_gpk}<br>
-----------------------------------------------------------------------------------------<br>
${generateRoomText(data.rooms)}
Next Steps: ${data.next_steps}<br>
Other Trades: ${data.other_trades}<br>
Matters for Consideration: ${data.matters_for_consideration}<br>
Accomodation: ${data.accomodation}<br>
Estimated Equipment Pickup: ${data.estimated_equipment_pickup}<br>
End Time: ${data.end_time}<br><br>

Total Time: ${calculateTimeDifference(data.start_time, data.end_time)}<br>
Equipment Total: <br>${sumEquipment(data.rooms)}

                    `,
                    Attachments: attachments
                }).then(
                    message => {
                        if(message === 'OK'){
                            messageContainer.textContent = "Email sent successfully!";
                            localStorage.clear()

                            
                        }
                        else{
                            messageContainer.textContent = "Email failed try again later"
                        }
                    }
                );
            })
            .catch(error => console.error(error));
    })
}

function generateRoomText(data){
    let text = ""
    for(let i = 0; i < data.length; i++){
        text += `
Room Name: ${data[i].room_name}<br>
Temperature: ${data[i].temperature}<br>
Dew Point: ${data[i].dew_point}<br>
Relative Humidity: ${data[i].relative_humidity}<br>
GPK: ${data[i].gpk}<br>
Width: ${data[i].width}<br>
Length: ${data[i].length}<br>
Height: ${data[i].height}<br>
Room Damage Percent: ${data[i].room_dmg_percent}<br>
Flooring Type: ${data[i].flooring_type}<br>
Carpet Type: ${data[i].carpet_type}<br>
Colour of Underlay: ${data[i].underlay_colour}<br>
Is Flooring Restorable: ${data[i].is_floor_restorable}<br>
Quantity of Flooring Removed: ${data[i].quantity_removed_floor}<br>
Findings: ${data[i].findings}<br>
Supporting Findings: ${data[i].supporting_findings}<br>
Actions: ${data[i].actions}<br>
Supporting Actions: ${data[i].supporting_actions}<br>
Equipment: ${data[i].equipment}<br>
-----------------------------------------------------------------------------------------<br>
`
    }
    return text
}


function handleFileSelect(event, newWidth = 800, newHeight = 640) {
    const fileInput = event.target;
    const roomDiv = fileInput.closest('.photoroom');
    const photoContainer = roomDiv.querySelector('.selectedPhotos');

    // Display selected photos for the specific room
    for (const file of fileInput.files) {
        const photoElement = document.createElement('div');

        // Display the image name
        const fileNameElement = document.createElement('div');
        fileNameElement.textContent = file.name;
        photoElement.appendChild(fileNameElement);

        const imgElement = document.createElement('img');
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // Calculate the aspect ratio to maintain proportions
                const aspectRatio = img.width / img.height;

                // Calculate the new dimensions while preserving aspect ratio
                if (aspectRatio > 1) {
                    newHeight = newWidth / aspectRatio;
                } else {
                    newWidth = newHeight * aspectRatio;
                }

                // Set imgElement dimensions
                imgElement.width = newWidth;
                imgElement.height = newHeight;

                // Display the processed image
                imgElement.src = resizeImage(img, newWidth, newHeight);
            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(file);

        // Append the image element to the container
        photoElement.appendChild(imgElement);

        // Add a remove button for each photo
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            // Remove the associated photo when the button is clicked
            photoElement.remove();

            // Remove the corresponding file from the file input
            const newFiles = Array.from(fileInput.files).filter(f => f !== file);
            updateFileInput(fileInput, newFiles);
        });

        // Append the remove button to the container
        photoElement.appendChild(removeButton);
        photoContainer.appendChild(photoElement);
    }
}

function resizeImage(img, newWidth, newHeight) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to the new dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the resized image onto the canvas
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    // Get the base64-encoded data URL
    return canvas.toDataURL('image/jpeg');
}

function updateFileInput(fileInput, files) {
    // Clear the existing files in the input
    fileInput.value = null;

    // Create a new DataTransfer object and add the files
    const dataTransfer = new DataTransfer();
    files.forEach(file => {
        dataTransfer.items.add(file);
    });

    // Update the file input with the new files
    fileInput.files = dataTransfer.files;
}

function setupFileInputs(){
    const fileInputs = document.querySelectorAll('.photos');
    fileInputs.forEach(fileInput => {
        fileInput.addEventListener('change', handleFileSelect);
    });
}

setupFileInputs()

function triggerDropdown(button){
    const parentDiv = button.parentNode;
    const dropdown = parentDiv.querySelectorAll('.collapsable-content')
    const displayVal = window.getComputedStyle(dropdown[0]).getPropertyValue('display')

    if(displayVal === 'block'){
        dropdown[0].style.display = 'none'
        button.textContent = "Show"
    }
    else {
        dropdown[0].style.display = 'block'
        button.textContent = "Hide"
    }
}

function showOptions(input) {
    const parentDiv = input.parentNode;
    const datalist = parentDiv.querySelector('datalist');
    const dropdown = parentDiv.querySelector('.dropdown');
    const datalistOptions = datalist.getElementsByTagName('option');

    // Show the dropdown
    dropdown.style.display = 'block';
    dropdown.style.width = input.offsetWidth + 'px';

    // Clear previous options
    dropdown.innerHTML = '';

    // Update the dropdown options based on the datalist
    for (var i = 0; i < datalistOptions.length; i++) {
        var optionValue = datalistOptions[i].value;

        // Create a div for each option
        var optionDiv = document.createElement('div');
        optionDiv.textContent = optionValue;

        // Add a click event listener to set the selected value in the input
        optionDiv.addEventListener('click', function () {
            input.value = this.textContent;
            dropdown.style.display = 'none'; // Hide the dropdown after selection
        });

        // Append the option div to the dropdown
        dropdown.appendChild(optionDiv);
    }

    // Hide the dropdown when clicking outside the input and dropdown
    document.addEventListener('click', function (e) {
        if (e.target !== dropdown && e.target !== input) {
            dropdown.style.display = 'none';
        }
    });
}

function toggleInput(checkbox) {

    // Get the specific input associated with the checkbox
    const parentDiv = checkbox.parentNode

    const inputField = parentDiv.getElementsByClassName(`${checkbox.value}-input`)[0];

    // Check if the checkbox is checked
    if (checkbox.checked) {
        // Show the additional input field
        inputField.style.display = 'block';
    } else {
        // Hide the additional input field if the checkbox is unchecked
        inputField.style.display = 'none';
    }

}

function calculateTimeDifference(startDateTime, endDateTime) {
    // Parse the input strings into Date objects
    const startTime = new Date(startDateTime);
    const endTime = new Date(endDateTime);

    // Calculate the difference in milliseconds
    const timeDifference = endTime - startTime;

    // Calculate hours and minutes
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} hours and ${minutes} minutes`;
}

function sumEquipment(rooms){
    let str = ''

    const equipment = {
        "AFD's": 0,
        "Dehumidifiers": 0,
        "Air Mover": 0,
        "Axial Drier": 0,
        "Drying Matt": 0
    }
    
    for(let i = 0; i < rooms.length; i++){
        for(let j = 0; j < rooms[i].equipment.length; j++){
            const key = rooms[i].equipment[j][0];

            if(equipment.hasOwnProperty(key)){
                equipment[key] += Number(rooms[i].equipment[j][1])
            }
        }
    }

    for(const key in equipment){
        if(equipment.hasOwnProperty(key)){
            str += `- ${key}: ${equipment[key]} <br>`
        }
    }

    return str
}