import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { notesReducer } from "../reducers/notesReducer";
import {
  getActiveNotes,
  getArchivedNotes,
  saveNote,
  updateNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../services/noteService";

const initialNotes = [];

const initialNoteForm = {
  id: 0,
  title: "",
  content: "",
  isActive: true,
};

export const useNotes = () => {
  const [notes, dispatch] = useReducer(notesReducer, initialNotes);
  const [noteSelected, setNoteSelected] = useState(initialNoteForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const getNotesActive = async () => {
    const result = await getActiveNotes();

    dispatch({
      type: "loadingActiveNotes",
      payload: result.data,
    });
  };

  const getNotesArchive = async () => {
    const result = await getArchivedNotes();

    dispatch({
      type: "loadingArchiveNotes",
      payload: result.data,
    });
  };

  const handlerAddNote = async (note) => {
    let response;

    if (note.id === 0) {
      response = await saveNote(note);
    } else {
      response = await updateNote(note.id, note);
    }

    dispatch({
      type: note.id === 0 ? "addNote" : "updateNote",
      payload: response,
    });

    if (note.id === 0) {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Note successfully created.",
        showConfirmButton: false,
        toast: true,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Note successfully edited.",
        showConfirmButton: false,
        toast: true,
        timer: 3000,
      });
    }
    handlerCloseForm();
    navigate("/");
  };

  const handlerRemoveNote = (id) => {
    Swal.fire({
      title: "Delete note?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteNote(id);
        dispatch({
          type: "removeNote",
          payload: id,
        });
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Note deleted successfully.",
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
      }
    });
  };

  const handlerArchiveNote = async (id) => {
    try {
      const response = await archiveNote(id);
      dispatch({
        type: "archiveNote",
        payload: response,
      });
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Note archived successfully.",
        showConfirmButton: false,
        toast: true,
        timer: 1500,
      });
      navigate("/archived");
    } catch (error) {
      console.error("Error archiving note:", error);
      Swal.fire("Error", "An error occurred while archiving the note", "error");
    }
  };

  const handlerUnarchiveNote = async (id) => {
    try {
      const response = await unarchiveNote(id);
      dispatch({
        type: "unarchiveNote",
        payload: response,
      });
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Note restored successfully.",
        showConfirmButton: false,
        toast: true,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Error unarchiving note:", error);
      Swal.fire(
        "Error",
        "An error occurred while unarchiving the note",
        "error"
      );
    }
  };

  const handlerNoteSelectedForm = (note) => {
    setVisibleForm(true);
    setNoteSelected({ ...note });
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setNoteSelected(initialNoteForm);
  };

  return {
    notes,
    noteSelected,
    initialNoteForm,
    visibleForm,
    handlerAddNote,
    handlerRemoveNote,
    handlerArchiveNote,
    handlerUnarchiveNote,
    handlerNoteSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getNotesActive,
    getNotesArchive,
  };
};
