require 'rails_helper'

RSpec.describe DashboardDecorator, type: :decorator do
  let(:opts) { {} }
  let(:dashboard) { FactoryGirl.create(:dashboard_with_widgets, opts) }
  let(:decorator) { DashboardDecorator.new(dashboard) }

  subject { dashboard.decorate }

  context 'dashboard without widgets' do
    let(:dashboard) { FactoryGirl.create(:dashboard, opts) }
    it { is_expected.to_not be_show_hero }
    it { is_expected.to_not be_show_kpis }
  end

  context 'dashboard with widgets' do
    it { is_expected.to be_show_hero }
    it { is_expected.to be_show_kpis }
  end

  context 'hide hero' do
    let(:opts) { {:display_hero => false} }
    it { is_expected.to_not be_show_hero }
    it { is_expected.to be_show_kpis }
  end

  context 'hide kpis' do
    let(:opts) { {:display_hero => false, :display_kpis => false} }
    it { is_expected.to_not be_show_hero }
    it { is_expected.to_not be_show_kpis }
  end


  describe 'convert notes to html' do
    let(:opts) { {:notes => '# Heading'} }

    subject { decorator.notes_to_html }

    it { is_expected.to eq "<h1>Heading</h1>\n" }

  end

  describe 'title' do
    let(:opts) { {:name => 'Blah Dashboard'} }
    subject { decorator.name }

    it { is_expected.to eq 'Blah' }
  end

  describe 'dashboardized_name' do
    context 'dashboard' do
      let(:opts) { {:name => 'Blah Dashboard'} }
      subject { decorator.dashboardized_name }

      it { is_expected.to eq 'Blah Dashboard' }
    end
    context 'no dashboard' do
      let(:opts) { {:name => 'Blah'} }
      subject { decorator.dashboardized_name }

      it { is_expected.to eq 'Blah Dashboard' }
    end
  end

  describe 'last_updated_at' do
    subject { decorator.last_updated_at }
    it { is_expected.to eq Time.zone.now.to_formatted_s(:month_year) }
  end

  describe 'to_csv' do
    context 'csv content not empty' do
      subject { decorator.to_csv }
      it { is_expected.not_to be_empty }
    end
  end
end
