import { createContext, useContext, useEffect, useState } from "react";
import { initialData } from "../data/mockDB";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("votingData")) || initialData;
  });

  /* ======================================
        ✅ SAVE TO LOCAL STORAGE
  ====================================== */
  useEffect(() => {
    localStorage.setItem("votingData", JSON.stringify(data));
  }, [data]);

  /* ======================================
        ✅ VOTER MANAGEMENT (ADMIN)
  ====================================== */
  const addVoter = (name) => {
    const newVoter = {
      id: "GOV" + Math.floor(1000 + Math.random() * 9000),
      name,
      voted: false
    };

    setData(prev => ({
      ...prev,
      voters: [...prev.voters, newVoter]
    }));

    return newVoter.id;
  };

  /* ======================================
        ✅ PARTY MANAGEMENT (ADMIN)
  ====================================== */
  const addParty = (name, logo) => {
    const newParty = {
      id: Date.now(),
      name,
      logo
    };

    setData(prev => ({
      ...prev,
      parties: [...prev.parties, newParty]
    }));
  };

  const updateParty = (id, name) => {
    setData(prev => ({
      ...prev,
      parties: prev.parties.map(p =>
        p.id === id ? { ...p, name } : p
      )
    }));
  };

  const deleteParty = (id) => {
    setData(prev => ({
      ...prev,
      parties: prev.parties.filter(p => p.id !== id)
    }));
  };

  /* ======================================
        ✅ CANDIDATE MANAGEMENT (ADMIN)
        ✅ DUPLICATES PREVENTED
  ====================================== */
  const addCandidate = (name, party, image) => {
    setData(prev => {
      // ✅ DUPLICATE CHECK
      const alreadyExists = prev.candidates.find(
        c =>
          c.name.toLowerCase() === name.toLowerCase() &&
          c.party === party
      );

      if (alreadyExists) {
        alert("❌ Candidate already exists!");
        return prev;
      }

      const newCandidate = {
        id: Date.now(),
        name,
        party,
        image,
        votes: 0
      };

      return {
        ...prev,
        candidates: [...prev.candidates, newCandidate]
      };
    });
  };

  const deleteCandidate = (id) => {
    setData(prev => ({
      ...prev,
      candidates: prev.candidates.filter(c => c.id !== id)
    }));
  };

  /* ======================================
        ✅ ELECTION CONTROL (ADMIN)
  ====================================== */
  const startElection = () => {
    setData(prev => ({
      ...prev,
      electionStatus: "LIVE"
    }));
  };

  const stopElection = () => {
    setData(prev => ({
      ...prev,
      electionStatus: "CLOSED"
    }));
  };

  /* ======================================
        ✅ VOTING SYSTEM (VOTER)
        ✅ ONE-VOTE-ONLY
  ====================================== */
  const castVote = (candidateId, voterId) => {
    setData(prev => ({
      ...prev,

      // ✅ LOCK VOTER
      voters: prev.voters.map(v =>
        v.id === voterId ? { ...v, voted: true } : v
      ),

      // ✅ INCREASE VOTE
      candidates: prev.candidates.map(c =>
        c.id === candidateId
          ? { ...c, votes: c.votes + 1 }
          : c
      )
    }));
  };

  /* ======================================
        ✅ PROVIDER EXPORT
  ====================================== */
  return (
    <DataContext.Provider
      value={{
        data,

        // ✅ VOTERS
        addVoter,

        // ✅ PARTIES
        addParty,
        updateParty,
        deleteParty,

        // ✅ CANDIDATES
        addCandidate,
        deleteCandidate,

        // ✅ ELECTION
        startElection,
        stopElection,

        // ✅ VOTING
        castVote
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
