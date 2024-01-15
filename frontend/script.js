
console.log("Heyo")

function generate(){
    const doc = fetch('http://localhost:3000/report');
    console.log("Document has been sent");
    console.log(doc);
}

function getData(){
    console.log("testing")
    console.log(document.getElementById('job_address').value)
    console.log(getCheckboxes('job_category'))
    let data = {
        "job_address": document.getElementById('job_address').value,
        "account": document.getElementById('account').value,
        "job_category": getCheckboxes('job_category'),
        attendence_num_date
        hrs_worked_bus_or_after
        client_discussion
        date_dmg_occurred
        cause_dmg
        water_damage_class
        water_damage_category
        temperature
        dew_point
        relative_humidity
        outdoor_gpk
        "rooms": getDataRooms()
        next_steps
        other_trades
        matters_for_consideration
        accomodation
        insurance_excess
        insurance_excess_amount
        estimated_equipment_pickup

    }
    console.log(data)
}

function getDataRooms(){
    let data = []
    let children = document.getElementById("rooms").children
    for(let i = 0; i < children.length; i++){
        let room = {
            room_name
            temperature
            dew_point
            relative_humidity
            gpk
            width
            length
            height
            room_dmg_percent
            flooring_type
            carpet_type
            underlay_colour
            is_floor_restorable
            quality_removed_floor
            findings
            supporting_findings
            actions
            supporting_actions
            equipment
            equipment_quantity
            photos
        }
    }
}

function generateRoom(){
    let div = document.createElement('div')
    div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()">Delete Room</button>

    <div>
        <label for="room_name">Room Name</label>
        <input type="text" id="room_name">
    </div>

    <div>
        <label for="temperature">Temperature</label>
        <input type="text" id="temperature">
    </div>

    <div>
        <label for="dew_point">Dew Point</label>
        <input type="text" id="dew_point">
    </div>

    <div>
        <label for="relative_humidity">Relative Humidity</label>
        <input type="text" id="relative_humidity">
    </div>

    <div>
        <label for="gpk">GPK</label>
        <input type="text" id="gpk">
    </div>

    <div>
        <label for="width">Width</label>
        <input type="text" id="width">
    </div>

    <div>
        <label for="length">Length</label>
        <input type="text" id="length">
    </div>

    <div>
        <label for="height">Height</label>
        <input type="text" id="height">
    </div>

    <div>
        <label for="room_dmg_percent">Room Damage %</label>
        <input type="text" id="room_dmg_percent">
    </div>

    <div>
        <label for="flooring_type">Flooring Type</label>
        <br>
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

    <div>
        <label for="carpet_type">If Carpet, Carpet Type</label>
        <br>
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

    <div>
        <label for="underlay_colour">Colour of Underlay</label>
        <br>
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
    
    <div>
        <label for="is_floor_restorable">Is Flooring Restorable</label>
        <input type="text" id="is_floor_restorable">
    </div>

    <div>
        <label for="quality_removed_floor">Quality of Flooring Removed</label>
        <input type="text" id="quality_removed_floor">
    </div>

    <div>
        <label for="findings">Findings</label>
        <br>
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

    <div>
        <label for="supporting_findings">Supporting Findings</label>
        <input type="text" id="supporting_findings">
    </div>

    <div>
        <label for="actions">Actions</label>
        <br>
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
    
    <div>
        <label for="supporting_actions">Supporting Actions</label>
        <input type="text" id="supporting_actions">
    </div>

    <div>
        <label for="equipment">Equipment</label>
        <br>
        <label for="AFD's">AFD's</label>
        <input type="checkbox" class="equipment" value="AFD's">

        <label for="Dehumidifiers">Dehumidifiers</label>
        <input type="checkbox" class="equipment" value="Dehumidifiers">

        <label for="Air Mover">Air Mover</label>
        <input type="checkbox" class="equipment" value="Air Mover">

        <label for="Axial Drier">Axial Drier</label>
        <input type="checkbox" class="equipment" value="Axial Drier">

        <label for="Drying Matt">Drying Matt</label>
        <input type="checkbox" class="equipment" value="Drying Matt">
    </div>

    <div>
        <label for="equipment_quantity">Equipment Quantity</label>
        <input type="text" id="equipment_quantity">
    </div>

    <div>
        <label for="photos">Photos</label>
        <input type="file" accept="image/jpeg, image/jpg" id="photos" multiple>
    </div>
    `
    document.getElementById('rooms').appendChild(div)
}

function getCheckboxes(checkbox_parent){
    let checkedVals = []
    let inputElements = document.getElementsByClassName(checkbox_parent)
    for(let i=0; i < inputElements.length; i++){
        if(inputElements[i].checked){
            checkedVals.push(inputElements[i].value)
        }
    }
    return checkedVals
}
