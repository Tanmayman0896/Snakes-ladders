"use client";

const routeTypes = {
  participant: "participant",
  admin: "admin",
  superadmin: "superadmin",
};

const handleLogout = () => {
  localStorage.removeItem("userRole")
  localStorage.removeItem("userId")
  localStorage.removeItem("username")
  localStorage.removeItem("token")
  window.location.href = '/login';
}

class ApiService {
  private API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole") as keyof typeof routeTypes;
    const routeType =
      userRole
      && !endpoint.startsWith("/auth")
      && !endpoint.startsWith("/version")
      && !endpoint.startsWith("/questions")
        ? `/${routeTypes[userRole]}`
        : "";
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && {Authorization: `Bearer ${token}`}),
        ...options.headers,
      },
      ...options,
    };

    if (!token && endpoint !== "/auth/login") {
      // If no token and not a login request, redirect to log in
      handleLogout();
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${this.API_BASE_URL}${routeType}${endpoint}`,
      config,
    );

    if (response.status === 401 || response.status === 403) {
      handleLogout();
      throw new Error("Unauthorized");
    }

    let resJson;
    try {
      resJson = await response.json();
    } catch (e) {
      console.log(e)
    }

    if (!response.ok) {
      throw new Error((resJson ? resJson.message : "") || `HTTP error! status: ${response.status} at ${endpoint}`);
    }

    return resJson;
  }

  async login(username: string, password: string): Promise<any> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    });
  }

  async fetchTeams(getAllCheckpoints = false): Promise<any> {
    return this.request(`/teams?allCheckpoints=${getAllCheckpoints}`);
  }

  async loadMoreCheckpoints(teamId: string, offset: number): Promise<any> {
    return this.request(`/teams/${teamId}/checkpoints?offset=${offset}`);
  }

  async approveCheckpoint(checkpointId: string): Promise<any> {
    return this.request(`/checkpoints/${checkpointId}/approve`, {
      method: 'POST',
    });
  }

  async markAnswer(answerId: string, isCorrect: boolean): Promise<any> {
    return this.request(`/checkpoints/${answerId}/mark`, {
      method: 'POST',
      body: JSON.stringify({isCorrect}),
    });
  }

  async deleteCheckpoint(checkpointId: string): Promise<any> {
    return this.request(`/checkpoints/${checkpointId}`, {
      method: 'DELETE',
    });
  }

  async pauseTimer(teamId: string): Promise<any> {
    return this.request(`/teams/${teamId}/timer/pause`, {
      method: 'POST',
    });
  }

  async resumeTimer(teamId: string): Promise<any> {
    return this.request(`/teams/${teamId}/timer/resume`, {
      method: 'POST',
    });
  }

  async getParticipantState(): Promise<any> {
    return this.request('/state');
  }

  async getPendingCheckpoints(): Promise<any> {
    return this.request('/checkpoints/pending');
  }

  async getLeaderboard(): Promise<any> {
    return this.request('/leaderboard');
  }

  async useHint(assignmentId: string): Promise<any> {
    return this.request('/hint/use', {
      method: 'POST',
      body: JSON.stringify({assignmentId}),
    });
  }

  async rollDice(): Promise<any> {
    return this.request('/dice/roll', {
      method: 'POST',
    });
  }

  async submitAnswer(assignmentId: string, answer: string): Promise<any> {
    return this.request('/answer/submit', {
      method: 'POST',
      body: JSON.stringify({assignmentId, answer}),
    });
  }

  async getBoard(): Promise<any> {
    return this.request('/board');
  }

  async getVersion(): Promise<string> {
    const data = await this.request<{ version: string }>('/version');
    return data.version;
  }

  async fetchBoardMaps(): Promise<any> {
    return this.request('/board/maps')
  }

  async fetchRoomCapacities(): Promise<any> {
    return this.request('/rooms/capacity')
  }

  async fetchAllQuestions(): Promise<any> {
    return this.request('/questions')
  }

  async fetchAuditLogs(searchAuditQuery: string): Promise<any> {
    return this.request(`/audit-logs?searchAuditQuery=${encodeURIComponent(searchAuditQuery)}`);
  }

  async resetTeamPassword(teamId: string, newPassword: string): Promise<any> {
    return this.request(`/teams/${teamId}/password`, {
      method: "PUT",
      body: JSON.stringify({newPassword}),
    });
  }

  async createTeam(teamData: { teamName: string; members: string[] }): Promise<any> {
    return this.request('/teams', {
      method: "POST",
      body: JSON.stringify(teamData),
    });
  }

  async createQuestion(data: any): Promise<any> {
    return this.request('/questions', {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteQuestion(questionId: string): Promise<any> {
    return this.request(`/questions/${questionId}`, {
      method: "DELETE",
    });
  }

  async editQuestion(questionId: string, data: any): Promise<any> {
    return this.request(`/questions/${questionId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async disqualifyTeam(teamId: string): Promise<any> {
    return this.request(`/teams/${teamId}/disqualify`, {
      method: "POST",
    });
  }

  async reinstateTeam(teamId: string): Promise<any> {
    return this.request(`/teams/${teamId}/reinstate`, {
      method: "POST",
    });
  }

  async changeTeamRoom(teamId: string, roomNumber: string): Promise<any> {
    return this.request(`/teams/${teamId}/room`, {
      method: "PUT",
      body: JSON.stringify({roomNumber}),
    });
  }

  async autoAssignRoomToTeam(teamId: string): Promise<any> {
    return this.request(`/teams/${teamId}/room/auto-assign`, {
      method: "POST",
    });
  }

  async assignMapToTeam(teamId: string, mapId: string): Promise<any> {
    return this.request(`/teams/${teamId}/map`, {
      method: "PUT",
      body: JSON.stringify({mapId}),
    });
  }

  async getSystemSettings(): Promise<any> {
    return this.request('/auth/settings');
  }
}

export const apiService = new ApiService();