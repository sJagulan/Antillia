
console.log("Heyo")

function generate(){
    const doc = fetch('http://localhost:3000/report');
    console.log("Document has been sent");
    console.log(doc);
}

function test(){
    console.log(document.getElementById('job_address').value)
}

function getData(){
    let data = {
        "job_address": document.getElementById('job_address').value,
        "account": document.getElementById('account').value,
        "job_category": getCheckboxes('job_category', document),
        "attendence_num_date": document.getElementById('attendence_num_date').value,
        "hrs_worked_bus_or_after": document.getElementById('hrs_worked_bus_or_after').value,
        "client_discussion": document.getElementById('client_discussion').value,
        "date_dmg_occurred": document.getElementById('date_dmg_occurred').value,
        "cause_dmg": document.getElementById('cause_dmg').value,
        "water_damage_class": document.getElementById('water_damage_class').value,
        "water_damage_category": document.getElementById('water_damage_category').value,
        "temperature": document.getElementById('temperature').value,
        "dew_point": document.getElementById('dew_point').value,
        "relative_humidity": document.getElementById('relative_humidity').value,
        "outdoor_gpk": document.getElementById('outdoor_gpk').value,
        "rooms": getDataRooms(),
        "next_steps": document.getElementById('next_steps').value,
        "other_trades": document.getElementById('other_trades').value,
        "matters_for_consideration": document.getElementById('matters_for_consideration').value,
        "accomodation": document.getElementById('accomodation').value,
        "insurance_excess": document.getElementById('insurance_excess').value,
        "insurance_excess_amount": document.getElementById('insurance_excess_amount').value,
        "estimated_equipment_pickup": document.getElementById('estimated_equipment_pickup').value,
    }
    
    data.rooms.then((roomsData) => {
        data.rooms = roomsData;
        console.log(data)
        processEmail(data);
    }).catch((error) => {
        console.error("Error retrieving rooms data:", error);
    });
}

async function getDataRooms(){
    let roomElements = Array.from(document.getElementById("rooms").children)
    return Promise.all(roomElements.map(async (roomElement) => {
        let photosData = await processPhotos(roomElement.querySelector('.photos').files)
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
            "quality_removed_floor": roomElement.querySelector('.quality_removed_floor').value,
            "findings": getCheckboxes('findings', roomElement),
            "supporting_findings": roomElement.querySelector('.supporting_findings').value,
            "actions": getCheckboxes('actions', roomElement),
            "supporting_actions": roomElement.querySelector('.supporting_actions').value,
            "equipment": getCheckboxes('equipment', roomElement),
            "equipment_quantity": roomElement.querySelector('.equipment_quantity').value,
            "photos": photosData,
        }
        return room
    }))
}

function generateRoom(){
    let div = document.createElement('div')
    div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()">Delete Room</button>

    <div>
        <label for="room_name">Room Name</label>
        <input type="text" class="room_name">
    </div>

    <div>
        <label for="temperature">Temperature</label>
        <input type="text" class="temperature">
    </div>

    <div>
        <label for="dew_point">Dew Point</label>
        <input type="text" class="dew_point">
    </div>

    <div>
        <label for="relative_humidity">Relative Humidity</label>
        <input type="text" class="relative_humidity">
    </div>

    <div>
        <label for="gpk">GPK</label>
        <input type="text" class="gpk">
    </div>

    <div>
        <label for="width">Width</label>
        <input type="text" class="width">
    </div>

    <div>
        <label for="length">Length</label>
        <input type="text" class="length">
    </div>

    <div>
        <label for="height">Height</label>
        <input type="text" class="height">
    </div>

    <div>
        <label for="room_dmg_percent">Room Damage %</label>
        <input type="text" class="room_dmg_percent">
    </div>

    <div class="checkbox-group">
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

    <div class="checkbox-group">
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

    <div class="checkbox-group">
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
        <input type="text" class="is_floor_restorable">
    </div>

    <div>
        <label for="quality_removed_floor">Quality of Flooring Removed</label>
        <input type="text" class="quality_removed_floor">
    </div>

    <div class="checkbox-group">
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
        <textarea type="text" class="supporting_findings"></textarea>
    </div>

    <div class="checkbox-group">
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
        <textarea type="text" class="supporting_actions"></textarea>
    </div>

    <div class="checkbox-group">
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
        <input type="text" class="equipment_quantity">
    </div>

    <div>
        <label for="photos">Photos</label>
        <input type="file" accept="image/jpg, image/jpeg" class="photos" multiple>
    </div>
    `
    document.getElementById('rooms').appendChild(div)
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

function processPhotos(files, targetWidth = 400, targetHeight = 320, compressionQuality = 0.8) {
    return new Promise((resolve, reject) => {
        const photosData = [];
        const reader = new FileReader();
        let count = 0;

        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Calculate the aspect ratio to maintain proportions
                const aspectRatio = img.width / img.height;

                // Calculate the new dimensions while preserving aspect ratio
                let newWidth = targetWidth;
                let newHeight = targetWidth / aspectRatio;

                if (newHeight > targetHeight) {
                    newHeight = targetHeight;
                    newWidth = targetHeight * aspectRatio;
                }

                // Set canvas dimensions to the new dimensions
                canvas.width = newWidth;
                canvas.height = newHeight;

                // Draw the resized image onto the canvas
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Get the base64-encoded data URL with compression
                const compressedDataUrl = canvas.toDataURL('image/jpeg', compressionQuality);

                // Push the compressed data to the array
                photosData.push(compressedDataUrl);

                count++;
                if (count < files.length) {
                    // Read the next file
                    reader.readAsDataURL(files[count]);
                } else {
                    // All files processed, resolve the promise with the result
                    resolve(photosData);
                }
            };

            img.src = e.target.result;
        };

        reader.onerror = function (error) {
            reject(error);
        };

        // Start reading the first file
        if (files.length > 0) {
            reader.readAsDataURL(files[count]);
        } else {
            // No files to process, resolve with an empty array
            resolve(photosData);
        }
    });
}

function processEmail(data) {
    
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
Attendence number and date: ${data.attendence_num_date}<br>
Hours worked/business or after: ${data.hrs_worked_bus_or_after}<br>
Client Discussion: ${data.client_discussion}<br>
Date Damage Occurred: ${data.date_dmg_occurred}<br>
Cause of Damage: ${data.cause_dmg}<br>
Water Damage Class: ${data.water_damage_class}<br>
Water Damage Category: ${data.water_damage_category}<br>
Temperature: ${data.temperature}<br>
Dew Point: ${data.dew_point}<br>
Relative Humidity: ${data.relative_humidity}<br>
Outdoor GPK: ${data.outdoor_gpk}<br>
-----------------------------------------------------------------------------------------<br>
${generateRoomText(data.rooms)}
Next Steps: ${data.next_steps}<br>
Other Trades: ${data.other_trades}<br>
Matters for Consideration: ${data.matters_for_consideration}<br>
Accomodation: ${data.accomodation}<br>
Insurance Excess: ${data.insurance_excess}<br>
Insurance Excess Amount: ${data.insurance_excess_amount}<br>
Estimated Equipment Pickup: ${data.estimated_equipment_pickup}<br>

                `,
                Attachments: attachments
            }).then(
                message => alert(message)
            );
        })
        .catch(error => console.error(error));
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
Quality of Flooring Removed: ${data[i].quality_removed_floor}<br>
Findings: ${data[i].findings}<br>
Supporting Findings: ${data[i].supporting_findings}<br>
Actions: ${data[i].actions}<br>
Supporting Actions: ${data[i].supporting_actions}<br>
Equipment: ${data[i].equipment}<br>
Equipment Quantity: ${data[i].equipment_quantity}<br>
-----------------------------------------------------------------------------------------<br>
`
    }
    return text
}