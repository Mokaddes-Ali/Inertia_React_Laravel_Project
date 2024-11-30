import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import NavLink from "@/Components/NavLink";

const BackupDownload = () => {
    const handleBackupDownload = () => {
        window.location.href = "/backup/download"; // রুট লিংক
    };

    return (
        <NavLink
            className="border-transparent text-white hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700"
            onClick={handleBackupDownload}
        >
           <FontAwesomeIcon icon={faDatabase} className="mr-3" />Backup
        </NavLink>
    );
};

export default BackupDownload;
