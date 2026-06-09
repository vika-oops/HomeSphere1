import Contact from "../models/contactmodel.js";
import sendEmail from "../utils/sendEmail.js";

// to create a contact
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, role, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      role,
      message,
    });

    await contact.save();

    // Notify Admin via email (HTML body)
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    const adminMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #0d9488;">New Contact Message</h2>
        <p>You have received a new message.</p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Role:</strong> ${role}</p>

          <p style="margin-top: 15px;">
            <strong>Message:</strong>
          </p>

          <p style="font-style: italic; color: #475569;">
            "${message}"
          </p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        email: adminEmail,
        subject: `New Contact Message from ${name}`,
        message: adminMessage,
      });
    } catch (emailErr) {
      console.error(
        "Admin notification email failed",
        emailErr.message
      );
    }

    res.status(201).json({
      success: true,
      message: "Contact message sent successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
};

// to get all contact (admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get contacts",
    });
  }
};

// to delete a contact
export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to reply to a contact message
export const replyContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { replyMessage } = req.body;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await sendEmail({
      to: contact.email,
      subject: "Reply to your contact message",
      text: `Hello ${contact.name},\n\n${replyMessage}\n\nBest regards,\nHomeSphere Team`,
    });

    res.status(200).json({
      success: true,
      message: "Reply sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};