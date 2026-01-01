// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin-dashboard.css";
// ADD THIS IMPORT
import { materialIcons } from "../components/materialIcons";
import { API_URL, getImageUrl } from "../config/apiConfig";
import {
  FaTachometerAlt,
  FaList,
  FaTags,
  FaStore,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaUser,
  FaHome,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaSync
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Hide Navbar and Footer when dashboard loads
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');

    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  // Data states
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Form states - REMOVE imageFile, add icon
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    icon: "category" // Default icon
  });

  const [subcategoryForm, setSubcategoryForm] = useState({
    name: "",
    category_id: ""
  });

  const [placeForm, setPlaceForm] = useState({
    name: "",
    description: "",
    address: "",
    imageFile: null,
    category_id: "",
    subcategory_id: ""
  });

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      fetchAllData();
    }
  }, [navigate]);

  // Fetch all data
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // Fetch categories
      const catRes = await fetch(`${API_URL}/api/categories`);
      const catData = await catRes.json();
      setCategories(catData || []);

      // Fetch places
      const placesRes = await fetch(`${API_URL}/api/places`);
      const placesData = await placesRes.json();
      setPlaces(placesData || []);

      // Fetch contacts
      const contactsRes = await fetch(`${API_URL}/api/contacts`);
      const contactsData = await contactsRes.json();
      setContacts(contactsData || []);

      // Fetch subcategories
      try {
        const subRes = await fetch(`${API_URL}/api/subcategories`);
        if (subRes.ok) {
          const subData = await subRes.json();
          setSubcategories(subData || []);
        }
      } catch (subError) {
        console.error("Error fetching subcategories:", subError);
        setSubcategories([]);
      }

    } catch (error) {
      console.error("Error fetching main data:", error);
      alert("Error loading data. Check if backend is running on port 5000.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminId");
    navigate("/admin/login");
  };

  // Open modal for adding items
  const openAddModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setEditingItem(null);
    setEditForm({});
    setCategoryForm({ name: "", icon: "category" });
    setSubcategoryForm({ name: "", category_id: "" });
    setPlaceForm({
      name: "",
      description: "",
      address: "",
      imageFile: null,
      category_id: "",
      subcategory_id: ""
    });
  };

  // Handle edit click
  const handleEdit = (type, item) => {
    setModalType(`edit-${type}`);
    setEditingItem(item);

    switch (type) {
      case "category":
        setEditForm({
          id: item.id,
          name: item.name,
          icon: item.icon || "category"
        });
        break;
      case "subcategory":
        setEditForm({
          id: item.id,
          name: item.name,
          category_id: item.category_id || ""
        });
        break;
      case "place":
        setEditForm({
          id: item.id,
          name: item.name,
          description: item.description || "",
          address: item.address || "",
          image: item.image || "",
          originalImage: item.image || "",
          imageFile: null,
          category_id: item.category_id || "",
          subcategory_id: item.subcategory_id || ""
        });
        break;
      default:
        return;
    }

    setShowModal(true);
  };

  // Handle update profile
  const handleUpdateProfile = async () => {
    const newEmail = document.getElementById('newEmail')?.value || '';
    const currentPassword = document.getElementById('currentPassword')?.value || '';
    const newPassword = document.getElementById('newPassword')?.value || '';
    const adminId = localStorage.getItem("adminId") || "1";

    if (!currentPassword) {
      alert("Current password is required!");
      return;
    }

    if (!newEmail && !newPassword) {
      alert("Please enter either new email or new password!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/admin/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newEmail || null,
          currentPassword,
          newPassword: newPassword || null,
          adminId
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ ${data.message}`);
        if (data.newEmail) {
          localStorage.setItem("adminEmail", data.newEmail);
        }
        if (document.getElementById('newEmail')) document.getElementById('newEmail').value = '';
        if (document.getElementById('currentPassword')) document.getElementById('currentPassword').value = '';
        if (document.getElementById('newPassword')) document.getElementById('newPassword').value = '';
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Full error updating profile:", error);
      alert(`❌ Error updating profile: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";
      let method = "POST";
      const formData = new FormData();
      let jsonBody = {};
      let useFormData = false;

      if (modalType.startsWith("edit-")) {
        method = "PUT";
        const editType = modalType.replace("edit-", "");

        switch (editType) {
            case "category":
            url = `${API_URL}/api/categories/update/${editForm.id}`;
            jsonBody = {
              name: editForm.name,
              icon: editForm.icon
            };
            break;
          case "subcategory":
            url = `${API_URL}/api/subcategories/update/${editForm.id}`;
            jsonBody = {
              name: editForm.name,
              category_id: editForm.category_id
            };
            break;
          case "place":
            url = `${API_URL}/api/places/update/${editForm.id}`;
            useFormData = true;
            
            formData.append('name', editForm.name);
            formData.append('description', editForm.description || "");
            formData.append('address', editForm.address || "");
            formData.append('existingImage', editForm.originalImage || "");
            formData.append('category_id', editForm.category_id || "");
            formData.append('subcategory_id', editForm.subcategory_id || "");
            
            const selectedCategory = categories.find(cat => cat.id == editForm.category_id);
            if (selectedCategory) {
              formData.append('category_name', selectedCategory.name);
            } else if (editForm.category_id) {
              formData.append('category_name', `category-${editForm.category_id}`);
            }
            
            if (editForm.imageFile) {
              formData.append('image', editForm.imageFile);
            }
            break;
          default:
            throw new Error(`Unknown edit type: ${editType}`);
        }
      } else {
        switch (modalType) {
            case "category":
            url = `${API_URL}/api/categories/add`;
            jsonBody = categoryForm;
            break;
          case "subcategory":
            url = `${API_URL}/api/subcategories/add`;
            jsonBody = subcategoryForm;
            break;
          case "place":
            url = `${API_URL}/api/places/add`;
            useFormData = true;
            
            formData.append('name', placeForm.name);
            formData.append('description', placeForm.description || "");
            formData.append('address', placeForm.address || "");
            formData.append('category_id', placeForm.category_id || "");
            formData.append('subcategory_id', placeForm.subcategory_id || "");
            
            const selectedCategory = categories.find(cat => cat.id == placeForm.category_id);
            if (selectedCategory) {
              formData.append('category_name', selectedCategory.name);
            } else if (placeForm.category_id) {
              formData.append('category_name', `category-${placeForm.category_id}`);
            }

            if (placeForm.imageFile) {
              formData.append('image', placeForm.imageFile);
            }
            break;
          default:
            throw new Error(`Unknown modal type: ${modalType}`);
        }
      }

      let res;
      if (useFormData) {
        res = await fetch(url, {
          method: method,
          body: formData
        });
      } else {
        res = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonBody)
        });
      }

      const data = await res.json();

      if (res.ok) {
        alert(`✅ ${data.message || "Operation successful!"}`);
        closeModal();

        if (modalType === "subcategory" || modalType === "edit-subcategory") {
            try {
            const subRes = await fetch(`${API_URL}/api/subcategories`);
            if (subRes.ok) {
              const subData = await subRes.json();
              setSubcategories(subData || []);
            }
          } catch (subError) {
            console.log("Could not refresh subcategories:", subError);
          }
        }

        fetchAllData();
      } else {
        alert(`❌ ${data.message || "Operation failed"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error saving data");
    }
  };

  // Handle delete operations
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      let url = "";
      switch (type) {
        case "category":
          url = `${API_URL}/api/categories/delete/${id}`;
          break;
        case "subcategory":
          url = `${API_URL}/api/subcategories/delete/${id}`;
          break;
        case "place":
          url = `${API_URL}/api/places/delete/${id}`;
          break;
        case "contact":
          url = `${API_URL}/api/contacts/delete/${id}`;
          break;
        default:
          return;
      }

      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert(`✅ ${data.message}`);
        fetchAllData();
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error deleting item");
    }
  };

  // Handle view place
  const handleViewPlace = (placeId) => {
    window.open(`/place/${placeId}`, '_blank');
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <FaHome className="logo-icon" />
            <h2>GoLocal Admin</h2>
          </div>
          <div className="admin-badge">Administrator</div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {[
              { id: "dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
              { id: "categories", icon: <FaList />, label: "Categories" },
              { id: "subcategories", icon: <FaTags />, label: "Subcategories" },
              { id: "places", icon: <FaStore />, label: "Places" },
              { id: "messages", icon: <FaEnvelope />, label: "Messages", badge: contacts.length },
              { id: "settings", icon: <FaCog />, label: "Settings" }
            ].map((item) => (
              <li
                key={item.id}
                className={activeSection === item.id ? "active" : ""}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <FaUser />
            </div>
            <div>
              <h4>{localStorage.getItem("adminEmail") || "Admin User"}</h4>
              <p>Administrator</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <h1>
              {activeSection === "dashboard" && "Dashboard Overview"}
              {activeSection === "categories" && "Categories Management"}
              {activeSection === "subcategories" && "Subcategories Management"}
              {activeSection === "places" && "Places Management"}
              {activeSection === "messages" && "Contact Messages"}
              {activeSection === "settings" && "Settings"}
            </h1>
            <p className="header-subtitle">
              {activeSection === "dashboard" && "Welcome to your admin dashboard"}
              {activeSection === "categories" && "Manage your business categories"}
              {activeSection === "subcategories" && "Organize your subcategories"}
              {activeSection === "places" && "Manage all places in your system"}
              {activeSection === "messages" && "View and manage contact messages"}
              {activeSection === "settings" && "Configure your system settings"}
            </p>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <section className="dashboard-section">
              <div className="stats-grid">
                <div className="stat-card stat-categories">
                  <div className="stat-icon">
                    <FaList />
                  </div>
                  <div className="stat-info">
                    <h3>{categories.length}</h3>
                    <p>Categories</p>
                  </div>
                </div>

                <div className="stat-card stat-subcategories">
                  <div className="stat-icon">
                    <FaTags />
                  </div>
                  <div className="stat-info">
                    <h3>{subcategories.length}</h3>
                    <p>Subcategories</p>
                  </div>
                </div>

                <div className="stat-card stat-places">
                  <div className="stat-icon">
                    <FaStore />
                  </div>
                  <div className="stat-info">
                    <h3>{places.length}</h3>
                    <p>Places</p>
                  </div>
                </div>

                <div className="stat-card stat-messages">
                  <div className="stat-icon">
                    <FaEnvelope />
                  </div>
                  <div className="stat-info">
                    <h3>{contacts.length}</h3>
                    <p>Messages</p>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                  <button className="action-btn" onClick={() => openAddModal("category")}>
                    <FaPlus />
                    <span>Add Category</span>
                  </button>
                  <button className="action-btn" onClick={() => openAddModal("subcategory")}>
                    <FaPlus />
                    <span>Add Subcategory</span>
                  </button>
                  <button className="action-btn" onClick={() => openAddModal("place")}>
                    <FaPlus />
                    <span>Add Place</span>
                  </button>
                  <button className="action-btn" onClick={() => setActiveSection("messages")}>
                    <FaEnvelope />
                    <span>View Messages</span>
                  </button>
                </div>
              </div>

              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  {places.slice(0, 3).map((place) => (
                    <div className="activity-item" key={place.id}>
                      <div className="activity-icon success">
                        <FaCheckCircle />
                      </div>
                      <div className="activity-details">
                        <p>Place: <strong>{place.name}</strong></p>
                        <span className="activity-time">Added recently</span>
                      </div>
                    </div>
                  ))}
                  {contacts.slice(0, 2).map((contact) => (
                    <div className="activity-item" key={contact.id}>
                      <div className="activity-icon success">
                        <FaEnvelope />
                      </div>
                      <div className="activity-details">
                        <p>Message from: <strong>{contact.name}</strong></p>
                        <span className="activity-time">New message</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Categories Section */}
          {activeSection === "categories" && (
            <section className="data-section">
              <div className="section-header">
                <h2>Categories ({categories.length})</h2>
                <button className="btn btn-primary" onClick={() => openAddModal("category")}>
                  <FaPlus /> Add Category
                </button>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Icon</th>
                      <th>Name</th>
                      <th>Places</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category.id}>
                        <td>#{category.id}</td>
                        <td>
                          <span className="material-icons" style={{ fontSize: "2rem", color: "#2e7d32" }}>
                            {category.icon || "category"}
                          </span>
                        </td>
                        <td>{category.name}</td>
                        <td>
                          <span className="badge">
                            {places.filter(p => p.category_id === category.id).length}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-edit"
                              title="Edit"
                              onClick={() => handleEdit("category", category)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-delete"
                              title="Delete"
                              onClick={() => handleDelete("category", category.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {categories.length === 0 && (
                  <div className="no-data">
                    <FaInfoCircle />
                    <p>No categories found</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Subcategories Section */}
          {activeSection === "subcategories" && (
            <section className="data-section">
              <div className="section-header">
                <h2>Subcategories ({subcategories.length})</h2>
                <button className="btn btn-primary" onClick={() => openAddModal("subcategory")}>
                  <FaPlus /> Add Subcategory
                </button>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subcategories.map(sub => (
                      <tr key={sub.id}>
                        <td>#{sub.id}</td>
                        <td>{sub.name}</td>
                        <td>
                          <span className="category-badge">
                            {categories.find(c => c.id === sub.category_id)?.name || `Category ${sub.category_id}`}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-edit"
                              title="Edit"
                              onClick={() => handleEdit("subcategory", sub)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-delete"
                              title="Delete"
                              onClick={() => handleDelete("subcategory", sub.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {subcategories.length === 0 && (
                  <div className="no-data">
                    <FaInfoCircle />
                    <p>No subcategories found</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Places Section */}
          {activeSection === "places" && (
            <section className="data-section">
              <div className="section-header">
                <h2>Places ({places.length})</h2>
                <button className="btn btn-primary" onClick={() => openAddModal("place")}>
                  <FaPlus /> Add Place
                </button>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {places.map(place => (
                      <tr key={place.id}>
                        <td>#{place.id}</td>
                        <td>
                          <div className="table-item">
                           {place.image && (
  <img src={getImageUrl(place.image)} alt={place.name} className="table-img" />
)}
                            <span>{place.name}</span>
                          </div>
                        </td>
                        <td>{place.address || "No address"}</td>
                        <td>
                          <span className="category-badge">
                            {categories.find(c => c.id === place.category_id)?.name || "Unknown"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-view"
                              title="View Details"
                              onClick={() => handleViewPlace(place.id)}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="btn btn-edit"
                              title="Edit"
                              onClick={() => handleEdit("place", place)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-delete"
                              title="Delete"
                              onClick={() => handleDelete("place", place.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {places.length === 0 && (
                  <div className="no-data">
                    <FaInfoCircle />
                    <p>No places found</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Messages Section */}
          {activeSection === "messages" && (
            <section className="data-section">
              <div className="section-header">
                <h2>Contact Messages ({contacts.length})</h2>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(contact => (
                      <tr key={contact.id}>
                        <td>#{contact.id}</td>
                        <td>
                          <div className="table-item">
                            <div className="user-avatar small">
                              {contact.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{contact.name}</span>
                          </div>
                        </td>
                        <td>{contact.email}</td>
                        <td className="message-cell">
                          <span title={contact.message}>
                            {contact.message.length > 60
                              ? `${contact.message.substring(0, 60)}...`
                              : contact.message}
                          </span>
                        </td>
                        <td>
                          <span className="date-badge">
                            <FaCalendarAlt /> {formatDate(contact.created_at)}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-view"
                              title="View Full Message"
                              onClick={() => {
                                alert(`Message from ${contact.name} (${contact.email}):\n\n${contact.message}`);
                              }}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="btn btn-delete"
                              title="Delete"
                              onClick={() => handleDelete("contact", contact.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {contacts.length === 0 && (
                  <div className="no-data">
                    <FaInfoCircle />
                    <p>No messages found</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <section className="settings-section">
              <h2>Settings</h2>
              <div className="settings-grid">
                <div className="settings-card">
                  <h3><FaUser /> Update Profile</h3>

                  <div className="current-admin-info">
                    <div className="info-row">
                      <span className="info-label">Current Email:</span>
                      <span className="info-value">{localStorage.getItem("adminEmail") || "admin@example.com"}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Admin ID:</span>
                      <span className="info-value">#{localStorage.getItem("adminId") || "1"}</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>New Email</label>
                    <input
                      type="email"
                      id="newEmail"
                      className="form-control"
                      placeholder="Enter new email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Current Password *</label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="form-control"
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password (optional)</label>
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control"
                      placeholder="Enter new password (leave blank to keep same)"
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleUpdateProfile}>
                    Update Profile
                  </button>
                </div>

                <div className="settings-card">
                  <h3><FaCog /> System Info</h3>
                  <div className="system-info">
                    <div className="info-row">
                      <span>Categories:</span>
                      <span className="badge">{categories.length}</span>
                    </div>
                    <div className="info-row">
                      <span>Subcategories:</span>
                      <span className="badge">{subcategories.length}</span>
                    </div>
                    <div className="info-row">
                      <span>Places:</span>
                      <span className="badge">{places.length}</span>
                    </div>
                    <div className="info-row">
                      <span>Messages:</span>
                      <span className="badge">{contacts.length}</span>
                    </div>
                    <div className="info-row">
                      <span>Database:</span>
                      <span className="status-active">Connected ✓</span>
                    </div>
                    <div className="info-row">
                      <span>Backend:</span>
                      <span className="status-active">Running ✓</span>
                    </div>
                  </div>

                  <h4>Quick Actions</h4>
                  <div className="quick-settings">
                    <button className="setting-action-btn" onClick={() => fetchAllData()}>
                      <FaSync /> Refresh Data
                    </button>
                    <button className="setting-action-btn warning" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalType === "category" && "Add New Category"}
                {modalType === "edit-category" && "Edit Category"}
                {modalType === "subcategory" && "Add New Subcategory"}
                {modalType === "edit-subcategory" && "Edit Subcategory"}
                {modalType === "place" && "Add New Place"}
                {modalType === "edit-place" && "Edit Place"}
              </h3>
              <button className="close-modal" onClick={closeModal}>
                <FaTimesCircle />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Add Category Form - MATERIAL ICONS */}
                {modalType === "category" && (
                  <>
                    <div className="form-group">
                      <label>Category Name *</label>
                      <input
                        type="text"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        placeholder="Enter category name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Select Icon *</label>
                      <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(6, 1fr)", 
                        gap: "8px",
                        maxHeight: "250px",
                        overflowY: "auto",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9"
                      }}>
                        {materialIcons.map((iconName, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCategoryForm({ ...categoryForm, icon: iconName })}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "12px 5px",
                              border: categoryForm.icon === iconName ? "2px solid #2e7d32" : "1px solid #ccc",
                              background: categoryForm.icon === iconName ? "#e8f5e9" : "white",
                              borderRadius: "6px",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                            title={iconName.replace(/_/g, ' ')}
                          >
                            <span className="material-icons" style={{ 
                              fontSize: "24px", 
                              color: "#2e7d32",
                              marginBottom: "5px"
                            }}>
                              {iconName}
                            </span>
                            <span style={{
                              fontSize: "10px",
                              color: "#666",
                              textAlign: "center",
                              wordBreak: "break-word",
                              maxWidth: "60px"
                            }}>
                              {iconName.length > 10 ? iconName.substring(0, 8) + '..' : iconName}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div style={{ 
                        marginTop: "15px", 
                        padding: "10px", 
                        backgroundColor: "#f0f7f0",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}>
                        <span className="material-icons" style={{ fontSize: "28px", color: "#2e7d32" }}>
                          {categoryForm.icon || 'category'}
                        </span>
                        <div>
                          <div style={{ fontWeight: "bold", color: "#2e7d32" }}>
                            Selected Icon: {categoryForm.icon || 'category'}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            {categoryForm.icon ? categoryForm.icon.replace(/_/g, ' ') : 'No icon selected'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Edit Category Form - MATERIAL ICONS */}
                {modalType === "edit-category" && (
                  <>
                    <div className="form-group">
                      <label>Category Name *</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Enter category name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Select Icon *</label>
                      <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(6, 1fr)", 
                        gap: "8px",
                        maxHeight: "250px",
                        overflowY: "auto",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9"
                      }}>
                        {materialIcons.map((iconName, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setEditForm({ ...editForm, icon: iconName })}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "12px 5px",
                              border: editForm.icon === iconName ? "2px solid #2e7d32" : "1px solid #ccc",
                              background: editForm.icon === iconName ? "#e8f5e9" : "white",
                              borderRadius: "6px",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                            title={iconName.replace(/_/g, ' ')}
                          >
                            <span className="material-icons" style={{ 
                              fontSize: "24px", 
                              color: "#2e7d32",
                              marginBottom: "5px"
                            }}>
                              {iconName}
                            </span>
                            <span style={{
                              fontSize: "10px",
                              color: "#666",
                              textAlign: "center",
                              wordBreak: "break-word",
                              maxWidth: "60px"
                            }}>
                              {iconName.length > 10 ? iconName.substring(0, 8) + '..' : iconName}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div style={{ 
                        marginTop: "15px", 
                        padding: "10px", 
                        backgroundColor: "#f0f7f0",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}>
                        <span className="material-icons" style={{ fontSize: "28px", color: "#2e7d32" }}>
                          {editForm.icon || 'category'}
                        </span>
                        <div>
                          <div style={{ fontWeight: "bold", color: "#2e7d32" }}>
                            Selected Icon: {editForm.icon || 'category'}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            {editForm.icon ? editForm.icon.replace(/_/g, ' ') : 'No icon selected'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Add Subcategory Form */}
                {modalType === "subcategory" && (
                  <>
                    <div className="form-group">
                      <label>Select Category *</label>
                      <select
                        value={subcategoryForm.category_id}
                        onChange={(e) => setSubcategoryForm({ ...subcategoryForm, category_id: e.target.value })}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Subcategory Name *</label>
                      <input
                        type="text"
                        value={subcategoryForm.name}
                        onChange={(e) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })}
                        placeholder="Enter subcategory name"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Edit Subcategory Form */}
                {modalType === "edit-subcategory" && (
                  <>
                    <div className="form-group">
                      <label>Select Category *</label>
                      <select
                        value={editForm.category_id}
                        onChange={(e) => setEditForm({ ...editForm, category_id: e.target.value })}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Subcategory Name *</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Enter subcategory name"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Add Place Form */}
                {modalType === "place" && (
                  <>
                    <div className="form-group">
                      <label>Place Name *</label>
                      <input
                        type="text"
                        value={placeForm.name}
                        onChange={(e) => setPlaceForm({ ...placeForm, name: e.target.value })}
                        placeholder="Enter place name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={placeForm.description}
                        onChange={(e) => setPlaceForm({ ...placeForm, description: e.target.value })}
                        placeholder="Enter description"
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        value={placeForm.address}
                        onChange={(e) => setPlaceForm({ ...placeForm, address: e.target.value })}
                        placeholder="Enter address"
                      />
                    </div>
                    <div className="form-group">
                      <label>Place Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setPlaceForm({
                              ...placeForm,
                              imageFile: file
                            });
                          }
                        }}
                      />
                      {placeForm.imageFile && (
                        <div style={{ marginTop: '10px', color: '#4CAF50' }}>
                          Selected: {placeForm.imageFile.name}
                        </div>
                      )}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Category *</label>
                        <select
                          value={placeForm.category_id}
                          onChange={(e) => setPlaceForm({ ...placeForm, category_id: e.target.value })}
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Subcategory</label>
                        <select
                          value={placeForm.subcategory_id}
                          onChange={(e) => setPlaceForm({ ...placeForm, subcategory_id: e.target.value })}
                        >
                          <option value="">Select subcategory (optional)</option>
                          {subcategories.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Edit Place Form */}
                {modalType === "edit-place" && (
                  <>
                    <div className="form-group">
                      <label>Place Name *</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Enter place name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={editForm.description || ""}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Enter description"
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        value={editForm.address || ""}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        placeholder="Enter address"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Current Image</label>
                      {editForm.originalImage ? (
                        <div style={{ marginBottom: '15px' }}>
                          <img
                            src={getImageUrl(editForm.originalImage)}
                            alt="Current"
                            style={{ maxWidth: '100px', maxHeight: '100px', border: '1px solid #ddd' }}
                          />
                          <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                            Current image
                          </p>
                        </div>
                      ) : (
                        <p style={{ color: '#999' }}>No current image</p>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>Update Image (optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const previewUrl = URL.createObjectURL(file);
                            setEditForm({
                              ...editForm,
                              imageFile: file,
                              image: previewUrl
                            });
                          }
                        }}
                      />
                      
                      {editForm.imageFile && (
                        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                          <div style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: '8px' }}>
                            📸 New Image Preview:
                          </div>
                          <img
                            src={editForm.image}
                            alt="New Preview"
                            style={{ maxWidth: '100px', maxHeight: '100px', border: '2px solid #4CAF50' }}
                          />
                          <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                            {editForm.imageFile.name}
                          </p>
                          <p style={{ fontSize: '12px', color: '#ff9800', marginTop: '5px' }}>
                            ⚠️ This will replace the current image
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Category *</label>
                        <select
                          value={editForm.category_id}
                          onChange={(e) => setEditForm({ ...editForm, category_id: e.target.value })}
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Subcategory</label>
                        <select
                          value={editForm.subcategory_id || ""}
                          onChange={(e) => setEditForm({ ...editForm, subcategory_id: e.target.value })}
                        >
                          <option value="">Select subcategory (optional)</option>
                          {subcategories.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {modalType === "category" && "Add Category"}
                    {modalType === "edit-category" && "Save Changes"}
                    {modalType === "subcategory" && "Add Subcategory"}
                    {modalType === "edit-subcategory" && "Save Changes"}
                    {modalType === "place" && "Add Place"}
                    {modalType === "edit-place" && "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default AdminDashboard;