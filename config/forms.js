const forms = [
    {
        "prefix": "simple",
        "name": "Simple",
        "rows": [
            [
                {
                    "type": "label",
                    "for": "length",
                    "content": "Length",
                },
                {
                    "type": "input",
                    "name": "length",
                    "default": 16
                }
            ],
            [
                {
                    "type": "button",
                    "content": "Re-gen"
                },
                {
                    "type": "textarea",
                    "id": "simple-form-output",
                    "name": "output",
                    "class": ["output"]
                }
            ]
        ]
    },
    {
        "prefix": "mysql",
        "name": "MySQL",
        "rows": [
            [
                {
                    "type": "label",
                    "for": "mysql-database-input",
                    "content": "Database",
                },
                {
                    "id": "mysql-database-input",
                    "type": "input",
                    "name": "database"
                }
            ],
            [
                {
                    "type": "label",
                    "for": "mysql-username-input",
                    "content": "Username (blank if same as Database)",
                },
                {
                    "id": "mysql-username-input",
                    "type": "input",
                    "name": "username"
                }
            ],
            [
                {
                    "type": "label",
                    "for": "length",
                    "content": "Length",
                },
                {
                    "type": "input",
                    "name": "length",
                    "default": 16
                }
            ],
            [
                {
                    "type": "label",
                    "for": "mysql-query-output",
                    "content": "Query command",
                },
                {
                    "type": "textarea",
                    "id": "mysql-query-output",
                    "name": "output",
                    "class": ["output"]
                }
            ],
            [
                {
                    "type": "label",
                    "for": "apache-config-output",
                    "content": "Apache config",
                },
                {
                    "type": "textarea",
                    "id": "apache-config-output",
                    "name": "output",
                    "class": ["output"]
                }
            ],
            [
                {
                    "type": "label",
                    "for": "nginx-config-output",
                    "content": "Nginx config",
                }
                , {
                    "type": "textarea",
                    "id": "nginx-config-output",
                    "name": "output",
                    "class": ["output"]
                }
            ],
            [
                {
                    "type": "label",
                    "for": "note-output",
                    "content": "Note",
                }
                , {
                    "type": "textarea",
                    "id": "note-output",
                    "name": "output",
                    "class": ["output"]
                }
            ]
        ]
    }
]

module.exports = forms;