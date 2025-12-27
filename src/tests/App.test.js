import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import SubscriptionList from '../components/SubscriptionList';
import AddSubscription from '../components/AddSubscription';
import SubscriptionDetails from '../components/SubscriptionDetails';
import SubscriptionStatus from '../components/SubscriptionStatus';
import Navbar from '../components/Navbar';

// App content for testing
const AppContent = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" exact component={SubscriptionList} />
      <Route path="/add-subscription" component={AddSubscription} />
      <Route path="/subscription/:id" component={SubscriptionDetails} />
      <Route path="/subscription-status/:id" component={SubscriptionStatus} />
    </Switch>
  </>
);

// Custom render function
const customRender = (initialEntries = ['/']) => 
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <SubscriptionProvider>
        <AppContent />
      </SubscriptionProvider>
    </MemoryRouter>
  );

test('renders_subscription_list_page_and_checks_for_initial_text', () => {
  customRender();
  const subscriptionList = screen.getByRole('heading', { name: /subscription list/i });
  expect(subscriptionList).toBeInTheDocument();
});

test('adds_a_new_subscription_and_checks_if_it_appears_in_the_list', async () => {
  customRender();

  // Navigate to the add subscription page
  fireEvent.click(screen.getByRole('link', { name: /add subscription/i }));

  // Fill in the form to add a new subscription
  fireEvent.change(screen.getByPlaceholderText(/subscription name/i), { target: { value: 'Premium Membership' } });
  fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: 50 } });
  fireEvent.change(screen.getByDisplayValue('Active'), { target: { value: 'Active' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /add subscription/i }));

  // Check if the new subscription appears in the list
  await waitFor(() => {
    expect(screen.getByText('Premium Membership')).toBeInTheDocument();
  });
});

test('displays_correct_details_for_a_subscription_when_clicked', async () => {
  customRender();

  // Add a new subscription first
  fireEvent.click(screen.getByRole('link', { name: /add subscription/i }));
  fireEvent.change(screen.getByPlaceholderText(/subscription name/i), { target: { value: 'Basic Plan' } });
  fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: 20 } });
  fireEvent.change(screen.getByDisplayValue('Active'), { target: { value: 'Active' } });
  fireEvent.click(screen.getByRole('button', { name: /add subscription/i }));

  // Navigate to the subscription details page
  fireEvent.click(screen.getByText('Basic Plan'));

  // Check if subscription details are displayed correctly
  expect(screen.getByText('Basic Plan')).toBeInTheDocument();
  expect(screen.getByText('Price: 20')).toBeInTheDocument();
  expect(screen.getByText('Status: Active')).toBeInTheDocument();
});

test('updates_subscription_status_correctly', async () => {
  customRender();

  // Add a new subscription first
  fireEvent.click(screen.getByRole('link', { name: /add subscription/i }));
  fireEvent.change(screen.getByPlaceholderText(/subscription name/i), { target: { value: 'Silver Plan' } });
  fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: 30 } });
  fireEvent.change(screen.getByDisplayValue('Active'), { target: { value: 'Active' } });
  fireEvent.click(screen.getByRole('button', { name: /add subscription/i }));

  // Navigate to the subscription status update page
  fireEvent.click(screen.getByText('Silver Plan'));
  fireEvent.click(screen.getByText(/update subscription status/i));

  // Update the status to "Paused"
  fireEvent.change(screen.getByDisplayValue(/active/i), { target: { value: 'Paused' } });
  fireEvent.click(screen.getByText(/update status/i));

  // Verify the status is updated
  await waitFor(() => {
    expect(screen.getByText('Status: Paused')).toBeInTheDocument();
  });
});

test('displays_subscription_not_found_if_subscription_does_not_exist_in_SubscriptionDetails', () => {
  customRender(['/subscription/999']);

  // Check for "Subscription not found"
  expect(screen.getByText(/Subscription not found!/i)).toBeInTheDocument();
});

test('checks_if_Subscription_List_page_renders_correctly', () => {
  customRender();

  // Check if "Subscription List" text is present
  expect(screen.getByRole('heading', { name: /Subscription List/i })).toBeInTheDocument();
});

test('checks_if_Add_Subscription_button_works_and_navigates_to_the_form', () => {
  customRender();

  // Click the "Add Subscription" button
  fireEvent.click(screen.getByRole('link', { name: /add subscription/i }));

  // Check if the form is displayed
  expect(screen.getByText(/Add New Subscription/)).toBeInTheDocument();
});

test('checks_if_Back_to_Subscription_List_button_works_in_SubscriptionDetails_page', async () => {
  customRender();

  // Add a subscription and navigate to Subscription Details
  fireEvent.click(screen.getByRole('link', { name: /add subscription/i }));
  fireEvent.change(screen.getByPlaceholderText(/subscription name/i), { target: { value: 'Gold Plan' } });
  fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: 100 } });
  fireEvent.change(screen.getByDisplayValue('Active'), { target: { value: 'Active' } });
  fireEvent.click(screen.getByRole('button', { name: /add subscription/i }));
  fireEvent.click(screen.getByText('Gold Plan'));

  // Click the "Back to Subscription List" button
  fireEvent.click(screen.getByText(/back to subscription list/i));

  // Check if the user is back to the Subscription List page
  expect(screen.getByRole('heading', { name: /Subscription List/i })).toBeInTheDocument();
});

test('checks_if_Add_Subscription_button_works_after_adding_a_subscription', async () => {
  customRender();

  // Click Add Subscription
  fireEvent.click(screen.getByRole('link', { name: /add subscription/i }));
  fireEvent.change(screen.getByPlaceholderText(/subscription name/i), { target: { value: 'Diamond Plan' } });
  fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: 200 } });
  fireEvent.change(screen.getByDisplayValue('Active'), { target: { value: 'Active' } });
  fireEvent.click(screen.getByRole('button', { name: /add subscription/i }));

  // Verify subscription list contains the new subscription
  await waitFor(() => {
    expect(screen.getByText('Diamond Plan')).toBeInTheDocument();
  });
});

test('checks_if_subscription_status_is_updated_correctly_on_subscription_list', async () => {
  customRender();

  // Add a subscription and navigate to update status
  fireEvent.click(screen.getByRole('link', { name: /add subscription/i }));
  fireEvent.change(screen.getByPlaceholderText(/subscription name/i), { target: { value: 'Platinum Plan' } });
  fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: 150 } });
  fireEvent.change(screen.getByDisplayValue('Active'), { target: { value: 'Active' } });
  fireEvent.click(screen.getByRole('button', { name: /add subscription/i }));

  // Go to subscription details and update the status
  fireEvent.click(screen.getByText('Platinum Plan'));
  fireEvent.click(screen.getByText(/update subscription status/i));
  fireEvent.change(screen.getByDisplayValue(/active/i), { target: { value: 'Cancelled' } });
  fireEvent.click(screen.getByText(/update status/i));

  // Navigate back to subscription list to verify status is updated
  fireEvent.click(screen.getByText(/back to subscription list/i));
  
  // Verify that status in the subscription list is updated
  await waitFor(() => {
    const listItem = screen.getByText('Platinum Plan').closest('li');
    expect(listItem).toHaveTextContent('Cancelled');
  });
});