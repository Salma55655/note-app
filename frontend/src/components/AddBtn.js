import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ReactComponent as AddIcon} from '../assets/add.svg'

function AddBtn (){
    return (
      <Link to="/note/new" className="floating-button">
        <AddIcon />
      </Link>
    );
}

export default AddBtn