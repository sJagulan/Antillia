
const docx = require('docx');
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');

const app = express();
const port = 3000;
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, VerticalAlign } = docx;

app.use(cors());


equipment = ["Air filtration devices with carbon filters will be installed during the technicians' work and will be removed when they finish."]
materials = ["100 - 150 fire sponges", "15L crossfire", "x2 Flexi Clamp with poles", "x2 window cleaning kits", "200pcs of Rags", "2 Box of 100pcs gloves", "50pcs masks", "20pcs coveralls", "4 spray bottles"]
scope_of_work = {
    "Bedroom 1": 
    [
        "Install AFD with a carbon filter when conducting work",
        "Dispose of all affected non-salvageable contents and speak to John Lyng about inventory process",
        "Fire sponges all affected ceiling, cornice, plaster wall, skirting boards, door, architraves, light fixtures, and other building materials",
        "Wet wash all affected ceiling, cornice, plaster wall, skirting boards, door, architraves, light fixtures, and other building materials",
        "Clean and sanitise all affected contents",
        "HEPA contact vacuum all affected areas"
    ],
    "Bedroom 2": 
    [
        "Install AFD with a carbon filter when conducting work",
        "Dispose of all affected non-salvageable contents and speak to John Lyng about inventory process",
        "Fire sponges all affected ceiling, cornice, plaster wall, skirting boards, door, architraves, light fixtures, and other building materials",
        "Wet wash all affected ceiling, cornice, plaster wall, skirting boards, door, architraves, light fixtures, and other building materials",
        "Clean and sanitise all affected contents",
        "HEPA contact vacuum all affected areas"
    ],
    "Dining Room": 
    [
        "Install AFD with a carbon filter when conducting work",
        "Dispose of all affected non-salvageable contents and speak to John Lyng about inventory process",
        "Fire sponges all affected ceiling, cornice, plaster wall, skirting boards, door, architraves, light fixtures, and other building materials",
        "Wet wash all affected ceiling, cornice, plaster wall, skirting boards, door, architraves, light fixtures, and other building materials",
        "Clean and sanitise all affected contents",
        "HEPA contact vacuum all affected areas"
    ],
    "Kitchen": [
        "Install AFD with a carbon filter when conducting work",
        "Dispose of all affected non-salvageable contents and speak to John Lyng about inventory process",
        "Fire sponges all affected ceiling, cornice, plaster wall, skirting boards, door, architraves, light fixtures, and other building materials",
        "Wet wash all affected ceiling, cornice, plaster wall, skirting boards, door, architraves, light fixtures, and other building materials",
        "Clean and sanitise all affected contents",
        "HEPA contact vacuum all affected areas"
    ],
    "Tidy up the residence after the repairs have been completed": []
}
hours = 96
rate = 47
material_costs = 600
disposal_costs = 450
gst = 557
summed_cost = hours*rate + material_costs + disposal_costs
total_cost = summed_cost + gst

var materials_list = ""

for (var i = 0; i < materials.length; i++){
    if(i === materials.length - 1){
        materials_list += materials[i]
    }
    else{
        materials_list += materials[i] + ", "
    }
}

// ----------------------------------------------------------

affected_area_psychometrics_headings = ["Room Name", "Attendance Relative Humidity (%)", "Attendance Temperature", "Attendance Dew Point", "Attendance GPK"]
data = [["Bedroom 1", "52.5%", "23.8°C", "12.3°C", "8.89°C"], ["Bathroom", "23.6°C", "52.1%", "11.9°C",	"8.56°C"]]

affected_area_findings_headings = ["Room Name", "Width Length", "Height", "Room Damage (%)"]
affected_area_findings_floor_headings = ["Flooring Type", "Carpet Type", "Colour of Underlay (Carpeted)", "Is Flooring Restorable?", "Quantity of Flooring Removed"]
findings_headings = ["Findings", "Findings - Supporting Information"]
actions_headings = ["Actions", "Actions - Supporting Information"]
equipment_register_table_headings = ["Room Name","Air Movers", "Dehumidifier", "Air Filtration Device (AFD)"]

// -----------------------------------------------------------

app.get('/quote', async (req, res) => {
    let doc = await docx.patchDocument(fs.readFileSync("templates/quote.docx"), {
        patches: {
            client: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "Johns Lyng Building Solutions (Victoria) Pty Ltd",
                    size: `${9}pt`
                })]
            },
            address: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "36 Coomoora Road Springvale South VIC",
                    size: `${9}pt`
                })]
            },
            postcode: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "3172",
                    size: `${9}pt`
                })]
            },
            requested_job: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "Fire and Smoke Remediation",
                    size: `${9}pt`
                })]
            },
            work_order_number: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "AEN-FD-1001",
                    size: `${9}pt`
                })]
            },
            client_work_order_number: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "Johns Lyng JVBS00890",
                    size: `${9}pt`
                })]
            },
            matters_for_consideration: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "The provided quotation was based on the information from the Quote Requested form and the photos provided. Variations may arise if additional work is necessary when we are on-site.",
                    size: `${9}pt`
                })]
            },
            appointment_number: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "N/A",
                    size: `${9}pt`
                })]
            },
            attendance_date: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "N/A",
                    size: `${9}pt`
                })]
            },
            number_resources_attending: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "3 resources for 4 whole days",
                    size: `${9}pt`
                })]
            },
            estimated_hours_worked: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${hours}`,
                    size: `${9}pt`
                })]
            },
            other_trades_involved: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: "No other trades are required at this stage.",
                    size: `${9}pt`
                })]
            },
            labour_cost: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${rate*hours}`,
                    size: `${9}pt`
                })]
            },
            rate: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${rate}`,
                    size: `${9}pt`,
                    italics: true
                })]
            },
            estimated_hours_worked_i: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${hours}`,
                    size: `${9}pt`,
                    italics: true
                })]
            },
            material_costs: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${material_costs}`,
                    size: `${9}pt`
                })]
            },
            material_list: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: materials_list,
                    size: `${9}pt`,
                    italics: true
                })]
            },
            disposal_costs: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${disposal_costs}`,
                    size: `${9}pt`
                })]
            },
            gst: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${gst}`,
                    size: `${9}pt`
                })]
            },
            costs_summed: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${summed_cost}`,
                    size: `${9}pt`
                })]
            },
            total_cost: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${total_cost}`,
                    size: `${9}pt`,
                    bold: true
                })]
            },
            
        }
    })

    for(let i = 0; i < equipment.length; i++){
        doc = await docx.patchDocument(doc, {
            patches: {
                equipment: {
                    type: docx.PatchType.PARAGRAPH,
                    children: [
                        new TextRun({
                            text: "    -    " + equipment[i] + "\n",
                            size: `${9}pt`,
                            break: 1
                        }),
                        new TextRun({
                            text: "{{equipment}}",
                            size: `${9}pt`
                        })
                    ]
                }
            }
        })
    }
    doc = await docx.patchDocument(doc, {
        patches: {
            equipment: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("")]
            }
        }
    })

    for(let i = 0; i < materials.length; i++){
        doc = await docx.patchDocument(doc, {
            patches: {
                materials_required: {
                    type: docx.PatchType.PARAGRAPH,
                    children: [
                        new TextRun({
                            text: "    -    " + materials[i] + "\n",
                            size: `${9}pt`,
                            break: 1
                        }),
                        new TextRun({
                            text: "{{materials_required}}",
                            size: `${9}pt`
                        })
                    ]
                }
            }
        })
    }
    doc = await docx.patchDocument(doc, {
        patches: {
            materials_required: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("")]
            }
        }
    })

    for(scope in scope_of_work){
        doc = await docx.patchDocument(doc, {
            patches: {
                scope_of_works_for_areas: {
                    type: docx.PatchType.PARAGRAPH,
                    children: [
                        new TextRun({
                            text: scope,
                            size: `${9}pt`,
                            bold: true,
                            break: 1
                        }),
                        new TextRun({
                            text: "{{scope_of_works_for_areas}}",
                            size: `${9}pt`
                        })
                    ]
                }
            }
        })
        for(let i = 0; i < scope_of_work[scope].length; i++){
            doc = await docx.patchDocument(doc, {
                patches: {
                    scope_of_works_for_areas: {
                        type: docx.PatchType.PARAGRAPH,
                        children: [
                            new TextRun({
                                text: `${i+1}) ` + scope_of_work[scope][i],
                                size: `${9}pt`,
                                break: 1
                            }),
                            new TextRun({
                                text: "{{scope_of_works_for_areas}}",
                                size: `${9}pt`
                            })
                        ]
                    }
                }
            })
        }
        doc = await docx.patchDocument(doc, {
            patches: {
                scope_of_works_for_areas: {
                    type: docx.PatchType.PARAGRAPH,
                    children: [
                        new TextRun({
                            text: "{{scope_of_works_for_areas}}",
                            break: 2
                        })
                    ]
                }
            }
        })
    }
    doc = await docx.patchDocument(doc, {
        patches: {
            scope_of_works_for_areas: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("")]
            }
        }
    })
    
    
    fs.writeFileSync("finalquote.docx", doc);

    res.setHeader('Content-Disposition', 'attachment; filename=finalquote.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    res.sendFile("finalquote.docx", {root: __dirname}, (err) => {
        if (err){
            console.error('Error sending file:', err);
            res.status(500).send('Internal Server Error');
        } 
        else {
            console.log('File sent successfully!');
            // Remove the file after sending it
            fs.unlinkSync("finalquote.docx");
        }
    });
});

app.get('/report', async (req, res) => {
    const doc = await docx.patchDocument(fs.readFileSync("templates/report.docx"), {
        patches: {
            account: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("Aji Nav")],
                size: `${9}pt`
            },
            work_order_number: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            client_work_order_number: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            job_category: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            affected_site_address: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            name: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            email: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            phone_number: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            address: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            appointment_number: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            business_hours_worked: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            attendance_date: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            after_hours_worked: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            number_resources_attending: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            client_discussion: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            date_damage_occurred: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            cause_of_damage: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            water_damage_class: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            water_damage_category: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            outdoor_relative_humidity: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            outdoor_temperature: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            outdoor_dew_humidity: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            outdoor_gpk: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            affected_area_psychometrics: {
                type: docx.PatchType.DOCUMENT,
                children: [
                    new Table({
                        rows: create_table(affected_area_psychometrics_headings, data)
                    })
                ],
            },
            affected_area_findings: {
                type: docx.PatchType.DOCUMENT,
                children: [
                    new Table({
                        rows: create_table(affected_area_findings_headings, data)
                    })
                ],
            },
            affected_area_findings_floor: {
                type: docx.PatchType.DOCUMENT,
                children: [
                    new Table({
                        rows: create_table(affected_area_findings_floor_headings, data)
                    })
                ],
            },
            findings: {
                type: docx.PatchType.DOCUMENT,
                children: [
                    new Table({
                        rows: create_table(findings_headings, data)
                    })
                ],
            },
            actions: {
                type: docx.PatchType.DOCUMENT,
                children: [
                    new Table({
                        rows: create_table(actions_headings, data)
                    })
                ],
            },
            equipment_register: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            equipment_register_table: {
                type: docx.PatchType.DOCUMENT,
                children: [
                    new Table({
                        rows: create_table(actions_headings, data)
                    })
                ],
            },
            equipment_left_on_site: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            yes_no_further_work: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            steps: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            yes_no_other_trades: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            what_trades_why_trades: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            matters_for_consideration: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            yes_no_temporary_accommodation: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            days_of_accommodation: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            insurance_excess_collected: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")],
                size: `${9}pt`
            },
            photographic_evidence: {
                type: docx.PatchType.DOCUMENT,
                children: [
                    new Table({
                        rows: create_photo_display()
                    })
                ],
            },
        }
    })

    fs.writeFileSync("finalreport.docx", doc);

    res.setHeader('Content-Disposition', 'attachment; filename=finalreport.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    res.sendFile("finalreport.docx", {root: __dirname}, (err) => {
        if (err){
            console.error('Error sending file:', err);
            res.status(500).send('Internal Server Error');
        } 
        else {
            console.log('File sent successfully!');
            // Remove the file after sending it
            fs.unlinkSync("finalreport.docx");
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

function create_table(headings, data){
    let rows = []

    let heading_row_cells = []
    for(let i = 0; i < headings.length; i++){
        heading_row_cells.push(
            new TableCell({
                children: [new Paragraph({children: [new TextRun({text: ` ${headings[i]} `, size: `${8}pt`, bold: true})]})],
                shading: { fill:  "B2BBCB" }
            })
        )
    }

    rows.push(new TableRow({children: heading_row_cells}))

    for(let i = 0; i < data.length; i++){
        let data_row_cells = []
        for(let j = 0; j < data[i].length; j++){
            data_row_cells.push(
                new TableCell({
                    children: [new Paragraph({children: [new TextRun({text: `${data[i][j]}`, size: `${8}pt`})]})],
                })
            )
        }
        rows.push(new TableRow({children: data_row_cells}))
    }

    return rows
}

function create_photo_display(){
    
}