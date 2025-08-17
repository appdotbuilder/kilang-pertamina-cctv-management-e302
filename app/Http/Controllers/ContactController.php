<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the contacts.
     */
    public function index(Request $request)
    {
        $contacts = Contact::active()
            ->latest()
            ->paginate(10);

        return Inertia::render('contacts/index', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Show the form for creating a new contact.
     */
    public function create()
    {
        return Inertia::render('contacts/create');
    }

    /**
     * Store a newly created contact in storage.
     */
    public function store(StoreContactRequest $request)
    {
        $contact = Contact::create($request->validated());

        return redirect()->route('contacts.index')
            ->with('success', 'Contact created successfully.');
    }

    /**
     * Display the specified contact.
     */
    public function show(Contact $contact)
    {
        return Inertia::render('contacts/show', [
            'contact' => $contact,
        ]);
    }

    /**
     * Show the form for editing the specified contact.
     */
    public function edit(Contact $contact)
    {
        return Inertia::render('contacts/edit', [
            'contact' => $contact,
        ]);
    }

    /**
     * Update the specified contact in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $contact->update($request->validated());

        return redirect()->route('contacts.show', $contact)
            ->with('success', 'Contact updated successfully.');
    }

    /**
     * Remove the specified contact from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}