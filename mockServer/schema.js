const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Generated schema for Root",
    type: "object",
    properties: {
        dailytime: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    employeeID: {
                        type: "string"
                    },
                    date: {
                        type: "string"
                    },
                    clockIn: {
                        type: "string"
                    },
                    clockOut: {
                        type: "string"
                    },
                    type: {
                        type: "string"
                    },
                    lateHrs: {
                        type: "number"
                    }
                },
                required: [
                    "employeeID",
                    "date",
                    "clockIn",
                    "clockOut",
                    "type",
                    "lateHrs"
                ]
            }
        },
        deductiontype: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    deductionID: {
                        type: "string"
                    },
                    deductionType: {
                        type: "string"
                    },
                    description: {
                        type: "string"
                    }
                },
                required: [
                    "deductionID",
                    "deductionType",
                    "description"
                ]
            }
        },
        department: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    departmentID: {
                        type: "string"
                    },
                    departmentName: {
                        type: "string"
                    },
                    manager: {
                        type: "string"
                    },
                    phoneNumber: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    }
                },
                required: [
                    "departmentID",
                    "departmentName",
                    "manager",
                    "phoneNumber",
                    "email"
                ]
            }
        },
        document: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    documentID: {
                        type: "string"
                    },
                    documentName: {
                        type: "string"
                    }
                },
                required: [
                    "documentID",
                    "documentName"
                ]
            }
        },
        documentrequest: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    requestID: {
                        type: "string"
                    },
                    documentID: {
                        type: "string"
                    },
                    employeeID: {
                        type: "string"
                    },
                    purpose: {
                        type: "string"
                    },
                    requestDate: {
                        type: "string"
                    },
                    status: {
                        type: "string"
                    }
                },
                required: [
                    "requestID",
                    "documentID",
                    "employeeID",
                    "purpose",
                    "requestDate",
                    "status"
                ]
            }
        },
        education: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    employeeID: {
                        type: "string"
                    },
                    universityName: {
                        type: "string"
                    },
                    major: {
                        type: "string"
                    },
                    graduatedYear: {
                        type: "number"
                    },
                    GPAX: {
                        type: "number"
                    }
                },
                required: [
                    "employeeID",
                    "universityName",
                    "major",
                    "graduatedYear",
                    "GPAX"
                ]
            }
        },
        information: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    employeeID: {
                        type: "string"
                    },
                    roleID: {
                        type: "string"
                    },
                    identificationNo: {
                        type: "string"
                    },
                    firstName: {
                        type: "string"
                    },
                    lastName: {
                        type: "string"
                    },
                    DOB: {
                        type: "string"
                    },
                    sex: {
                        type: "string"
                    },
                    phoneNumber: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    },
                    sickRemain: {
                        type: "number"
                    },
                    personalRemain: {
                        type: "number"
                    },
                    vacationRemain: {
                        type: "number"
                    },
                    maternityRemain: {
                        type: "number"
                    },
                    passwordHash: {
                        type: "string"
                    },
                    bankName: {
                        type: "string"
                    },
                    bankAccount: {
                        type: "string"
                    },
                    photo: {
                        type: "string"
                    }
                },
                required: [
                    "employeeID",
                    "roleID",
                    "identificationNo",
                    "firstName",
                    "lastName",
                    "DOB",
                    "sex",
                    "phoneNumber",
                    "email",
                    "address",
                    "sickRemain",
                    "personalRemain",
                    "vacationRemain",
                    "maternityRemain",
                    "passwordHash",
                    "bankName",
                    "bankAccount"
                ]
            }
        },
        leaveapplication: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    bookingID: {
                        type: "string"
                    },
                    employeeID: {
                        type: "string"
                    },
                    leaveID: {
                        type: "string"
                    },
                    bookingDate: {
                        type: "string"
                    },
                    reason: {
                        type: "string"
                    },
                    startDate: {
                        type: "string"
                    },
                    endDate: {
                        type: "string"
                    },
                    status: {
                        type: "string"
                    },
                    document: {
                        type: "string"
                    }
                },
                required: [
                    "bookingID",
                    "employeeID",
                    "leaveID",
                    "bookingDate",
                    "reason",
                    "startDate",
                    "endDate",
                    "status"
                ]
            }
        },
        leavebooking: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    bookingID: {
                        type: "string"
                    },
                    confirmation: {
                        type: "string"
                    },
                    managerNote: {
                        type: "string"
                    }
                },
                required: [
                    "bookingID",
                    "confirmation"
                ]
            }
        },
        leavetype: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    leaveID: {
                        type: "string"
                    },
                    leaveName: {
                        type: "string"
                    },
                    dayAvailable: {
                        type: "number"
                    }
                },
                required: [
                    "leaveID",
                    "leaveName",
                    "dayAvailable"
                ]
            }
        },
        monthlypayslip: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    employeeID: {
                        type: "string"
                    },
                    month: {
                        type: "string"
                    },
                    transferor: {
                        type: "string"
                    }
                },
                required: [
                    "employeeID",
                    "month",
                    "transferor"
                ]
            }
        },
        notification: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    notificationID: {
                        type: "string"
                    },
                    senderID: {
                        type: "string"
                    },
                    status: {
                        type: "string"
                    },
                    date: {
                        type: "string"
                    },
                    content: {
                        type: "string"
                    },
                    title: {
                        type: "string"
                    }
                },
                required: [
                    "notificationID",
                    "senderID",
                    "status",
                    "date",
                    "content",
                    "title"
                ]
            }
        },
        overtime: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    employeeID: {
                        type: "string"
                    },
                    clockOut: {
                        type: "string"
                    },
                    positionID: {
                        type: "string"
                    }
                },
                required: [
                    "employeeID",
                    "clockOut",
                    "positionID"
                ]
            }
        },
        position: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    positionID: {
                        type: "string"
                    },
                    departmentID: {
                        type: "string"
                    },
                    positionName: {
                        type: "string"
                    },
                    salary: {
                        type: "number"
                    },
                    clockIn: {
                        type: "string"
                    },
                    clockOut: {
                        type: "string"
                    }
                },
                required: [
                    "positionID",
                    "departmentID",
                    "positionName",
                    "salary",
                    "clockIn",
                    "clockOut"
                ]
            }
        },
        promotionhistory: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    employeeID: {
                        type: "string"
                    },
                    positionName: {
                        type: "string"
                    },
                    startDate: {
                        type: "string"
                    },
                    salary: {
                        type: "number"
                    },
                    stopDate: {
                        type: "string"
                    }
                },
                required: [
                    "employeeID",
                    "positionName",
                    "startDate",
                    "salary"
                ]
            }
        },
        requestbooking: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    requestID: {
                        type: "string"
                    },
                    confirmationDate: {
                        type: "string"
                    },
                    status: {
                        type: "string"
                    },
                    managerNote: {
                        type: "string"
                    }
                },
                required: [
                    "requestID",
                    "confirmationDate",
                    "status"
                ]
            }
        },
        userrole: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    roleID: {
                        type: "string"
                    },
                    roleName: {
                        type: "string"
                    }
                },
                required: [
                    "roleID",
                    "roleName"
                ]
            }
        }
    },
    required: [
        "dailytime",
        "deductiontype",
        "department",
        "document",
        "documentrequest",
        "education",
        "information",
        "leaveapplication",
        "leavebooking",
        "leavetype",
        "monthlypayslip",
        "notification",
        "overtime",
        "position",
        "promotionhistory",
        "requestbooking",
        "userrole"
    ]
}

export default schema;