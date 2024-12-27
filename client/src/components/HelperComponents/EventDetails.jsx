import React, { useState } from 'react';
import { Calendar, Clock, Users, Link as LinkIcon, Edit2, Save, X } from 'lucide-react';

export function EventDetails({
  date,
  startTime: initialStartTime,
  endTime: initialEndTime,
  link: initialLink,
  maxParticipants: initialMaxParticipants,
  enrolledCount,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [link, setLink] = useState(initialLink);
  const [maxParticipants, setMaxParticipants] = useState(initialMaxParticipants);

  const handleSave = () => {
    onSave({ startTime, endTime, link, maxParticipants });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setStartTime(initialStartTime);
    setEndTime(initialEndTime);
    setLink(initialLink);
    setMaxParticipants(initialMaxParticipants);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Edit2 size={16} />
            Edit Details
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <Calendar className="text-blue-600" size={20} />
          <span className="text-gray-600">{date}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-blue-600" size={20} />
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
              <span>to</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
          ) : (
            <span className="text-gray-600">{startTime} - {endTime}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <LinkIcon className="text-blue-600" size={20} />
          {isEditing ? (
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="flex-1 border rounded px-3 py-1"
              placeholder="Meeting link"
            />
          ) : (
            <a href={link} className="text-blue-600 hover:underline">{link}</a>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Users className="text-blue-600" size={20} />
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                className="border rounded w-20 px-3 py-1"
                min={enrolledCount}
              />
              <span className="text-gray-600">max participants</span>
            </div>
          ) : (
            <span className="text-gray-600">{enrolledCount} / {maxParticipants} participants</span>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:text-white hover:bg-red-500 bg-gray-50 text-black"
          >
            <X size={16}  />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
